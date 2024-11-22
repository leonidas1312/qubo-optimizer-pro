from fastapi import Request
import requests
from typing import Optional
import base64

async def get_repo_tree(owner: str, repo: str, token: str) -> dict:
    response = requests.get(
        f"https://api.github.com/repos/{owner}/{repo}/git/trees/main?recursive=1",
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github.v3+json",
        },
    )
    
    if response.status_code != 200:
        return {"error": "Failed to fetch repository contents"}
        
    return response.json()

async def get_file_content(owner: str, repo: str, path: str, token: str) -> dict:
    try:
        # Get the file blob using the Git Data API
        response = requests.get(
            f"https://api.github.com/repos/{owner}/{repo}/git/blobs/{path}",
            headers={
                "Authorization": f"Bearer {token}",
                "Accept": "application/vnd.github.v3+json",
            },
        )
        
        if response.status_code != 200:
            # If blob not found, try the regular API as fallback
            response = requests.get(
                f"https://api.github.com/repos/{owner}/{repo}/contents/{path}",
                headers={
                    "Authorization": f"Bearer {token}",
                    "Accept": "application/vnd.github.v3+json",
                },
            )
            
            if response.status_code != 200:
                return {"error": "Failed to fetch file contents"}
        
        data = response.json()
        
        # Handle both blob and contents API responses
        content = data.get("content", "")
        encoding = data.get("encoding", "base64")
        
        return {
            "content": content,
            "encoding": encoding,
            "type": "file",
            "name": path.split("/")[-1],
        }
        
    except Exception as e:
        return {"error": str(e)}

def build_tree(items: dict) -> list:
    root = []
    paths = {}
    
    for item in items['tree']:
        parts = item['path'].split('/')
        current = root
        
        for i, part in enumerate(parts):
            full_path = '/'.join(parts[:i+1])
            
            if full_path not in paths:
                new_node = {
                    'name': part,
                    'path': item['sha'] if i == len(parts) - 1 else full_path,
                    'type': 'tree' if i < len(parts) - 1 or item['type'] == 'tree' else 'file',
                    'children': [] if i < len(parts) - 1 or item['type'] == 'tree' else None
                }
                current.append(new_node)
                paths[full_path] = new_node
                current = new_node['children'] if new_node['children'] is not None else []
            else:
                current = paths[full_path]['children'] if paths[full_path]['children'] is not None else []
    
    return root