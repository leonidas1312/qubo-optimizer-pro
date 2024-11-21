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
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    SessionMiddleware,
    secret_key="your-secret-key",  # Change this to a secure secret key
    same_site="lax",
    https_only=False  # Set to True in production
)

# GitHub OAuth configuration
GITHUB_CLIENT_ID = "your-github-client-id"  # Replace with your GitHub OAuth App client ID
GITHUB_CLIENT_SECRET = "your-github-client-secret"  # Replace with your GitHub OAuth App client secret
GITHUB_REDIRECT_URI = "http://localhost:8000/api/auth/github/callback"

# ... keep existing code (QUBO-related endpoints)

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
        },
        headers={"Accept": "application/json"},
    )
    
    access_token = token_response.json().get("access_token")
    
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
    
    return RedirectResponse(url="http://localhost:5173/uploadalgos")

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