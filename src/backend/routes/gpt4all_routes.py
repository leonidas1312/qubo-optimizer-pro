from fastapi import APIRouter, HTTPException
import requests

router = APIRouter()

GPT4ALL_BASE_URL = "http://localhost:4891/v1"

@router.get("/models")
async def get_models():
    try:
        response = requests.get(f"{GPT4ALL_BASE_URL}/models")
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Failed to fetch models from GPT4All")
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/chat/completions")
async def chat_completions(request_data: dict):
    try:
        response = requests.post(
            f"{GPT4ALL_BASE_URL}/chat/completions",
            json=request_data
        )
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Failed to get completion from GPT4All")
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))