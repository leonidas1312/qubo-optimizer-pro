from fastapi import APIRouter, HTTPException
import requests
from typing import Dict, Any

router = APIRouter()

GPT4ALL_BASE_URL = "http://localhost:4891/v1"

@router.get("/models")
async def get_models():
    try:
        response = requests.get(f"{GPT4ALL_BASE_URL}/models")
        if response.status_code != 200:
            error_msg = response.json().get('error', 'Failed to fetch models from GPT4All')
            raise HTTPException(status_code=response.status_code, detail=error_msg)
        return response.json()
    except requests.RequestException as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Failed to connect to GPT4All service: {str(e)}"
        )

@router.post("/chat/completions")
async def chat_completions(request_data: Dict[Any, Any]):
    try:
        response = requests.post(
            f"{GPT4ALL_BASE_URL}/chat/completions",
            json=request_data,
            timeout=30  # Add timeout to prevent hanging
        )
        
        if response.status_code != 200:
            error_msg = response.json().get('error', 'Failed to get completion from GPT4All')
            raise HTTPException(status_code=response.status_code, detail=error_msg)
            
        return response.json()
    except requests.Timeout:
        raise HTTPException(
            status_code=504,
            detail="Request to GPT4All timed out"
        )
    except requests.RequestException as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to connect to GPT4All service: {str(e)}"
        )