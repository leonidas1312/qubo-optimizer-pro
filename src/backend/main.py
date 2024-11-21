from fastapi import FastAPI, UploadFile, File, Request
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from typing import Dict, Any
import json
from backend.solver import solve_qubo
import tempfile
import os
import requests
from fastapi.responses import RedirectResponse
from starlette.middleware.sessions import SessionMiddleware

app = FastAPI()

# Configure CORS and Session
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    SessionMiddleware,
    secret_key="your-secret-key",
    same_site="none",
    https_only=False
)

# GitHub OAuth configuration
GITHUB_CLIENT_ID = "Ov23lik0nLhm747FIJLk"
GITHUB_CLIENT_SECRET = "d329548607d310f4260a2a8c7b9d27eef763f77b"
GITHUB_REDIRECT_URI = "http://localhost:8080/auth/github/callback"
FRONTEND_URL = "http://localhost:8080"

@app.post("/api/load-matrix")
async def load_matrix(file: UploadFile = File(...)):
    try:
        # Create a temporary file to save the uploaded content
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_file.flush()

            # Load the numpy array from the temporary file
            data = np.load(temp_file.name, allow_pickle=True)

        # Clean up the temporary file
        os.unlink(temp_file.name)

        # Extract matrix and constant from the loaded data
        if isinstance(data, np.ndarray) and data.shape == (2,):
            matrix = data[0]
            constant = float(data[1])
        else:
            raise ValueError("Invalid file format: Expected array with shape (2,)")

        # Convert numpy array to Python list for JSON serialization
        matrix_list = matrix.tolist()

        return {
            "matrix": matrix_list,
            "constant": constant
        }
    except Exception as e:
        return {"error": str(e)}

@app.post("/api/solve")
async def solve(data: Dict[Any, Any]):
    try:
        matrix = np.array(data["matrix"])
        constant = float(data.get("constant", 0.0))
        solver_type = data.get("solver", "tabu-search")
        parameters = data.get("parameters", {})

        # Call the solver function
        best_solution, best_cost, iterations_cost, time_taken = solve_qubo(
            qubo_matrix=matrix,
            solver_type=solver_type,
            parameters=parameters,
            constant=constant
        )

        return {
            "solution": best_solution.tolist(),
            "cost": float(best_cost),
            "iterations_cost": [float(c) for c in iterations_cost],
            "time": time_taken
        }
    except Exception as e:
        return {"error": str(e)}

@app.get("/api/auth/github")
async def github_login():
    return RedirectResponse(
        f"https://github.com/login/oauth/authorize?client_id={GITHUB_CLIENT_ID}&redirect_uri={GITHUB_REDIRECT_URI}"
    )

@app.get("/api/auth/github/callback")
async def github_callback(request: Request, code: str):
    # Exchange code for access token
    token_response = requests.post(
        "https://github.com/login/oauth/access_token",
        data={
            "client_id": GITHUB_CLIENT_ID,
            "client_secret": GITHUB_CLIENT_SECRET,
            "code": code,
            "redirect_uri": GITHUB_REDIRECT_URI
        },
        headers={"Accept": "application/json"},
    )

    access_token = token_response.json().get("access_token")
    if not access_token:
        return RedirectResponse(url=f"{FRONTEND_URL}?error=auth_failed")

    # Get user data
    user_response = requests.get(
        "https://api.github.com/user",
        headers={
            "Authorization": f"Bearer {access_token}",
            "Accept": "application/json",
        },
    )

    user_data = user_response.json()
    request.session["github_token"] = access_token
    request.session["user"] = user_data

    # Redirect back to the frontend upload page
    return RedirectResponse(url=f"{FRONTEND_URL}/uploadalgos")

@app.get("/api/auth/status")
async def auth_status(request: Request):
    user = request.session.get("user")
    return {
        "authenticated": user is not None,
        "user": user
    }

@app.get("/api/auth/logout")
async def logout(request: Request):
    request.session.clear()
    return {"message": "Logged out successfully"}

@app.get("/api/github/repos")
async def get_repos(request: Request):
    token = request.session.get("github_token")
    if not token:
        return {"error": "Not authenticated"}
    
    response = requests.get(
        "https://api.github.com/user/repos",
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/json",
        },
    )
    
    return response.json()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
