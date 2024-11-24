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
from backend.routes.github_routes import get_file_content, build_tree

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
    same_site="lax",
    https_only=False
)

GITHUB_CLIENT_ID = "Ov23lik0nLhm747FIJLk"
GITHUB_CLIENT_SECRET = "d329548607d310f4260a2a8c7b9d27eef763f77b"
GITHUB_REDIRECT_URI = "http://localhost:8000/api/auth/github/callback"
FRONTEND_URL = "http://localhost:8080"

# Move GitHub-related routes to a separate file
from backend.routes.github_routes import router as github_router
app.include_router(github_router, prefix="/api/github")

# Move solver-related routes to a separate file
from backend.routes.solver_routes import router as solver_router
app.include_router(solver_router, prefix="/api")

@app.get("/api/auth/github")
async def github_login():
    return RedirectResponse(
        f"https://github.com/login/oauth/authorize?client_id={GITHUB_CLIENT_ID}&redirect_uri={GITHUB_REDIRECT_URI}&scope=read:user,user:email repo"
    )

@app.get("/api/auth/github/callback")
async def github_callback(request: Request, code: str):
    try:
        # Exchange code for access token
        token_response = requests.post(
            "https://github.com/login/oauth/access_token",
            data={
                "client_id": GITHUB_CLIENT_ID,
                "client_secret": GITHUB_CLIENT_SECRET,
                "code": code,
            },
            headers={"Accept": "application/json"},
        )

        access_token = token_response.json().get("access_token")
        if not access_token:
            return {"error": "Failed to retrieve access token"}

        # Get user data including email
        user_response = requests.get(
            "https://api.github.com/user",
            headers={
                "Authorization": f"Bearer {access_token}",
                "Accept": "application/json",
            },
        )
        user_data = user_response.json()

        # Get user's email
        emails_response = requests.get(
            "https://api.github.com/user/emails",
            headers={
                "Authorization": f"Bearer {access_token}",
                "Accept": "application/json",
            },
        )
        emails = emails_response.json()
        primary_email = next((email["email"] for email in emails if email["primary"]), None)
        
        if primary_email:
            user_data["email"] = primary_email

        request.session["github_token"] = access_token
        request.session["user"] = user_data

        return RedirectResponse(url=f"{FRONTEND_URL}/auth/callback")
    except Exception as e:
        print("Error during GitHub callback:", str(e))
        return {"error": str(e)}

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)