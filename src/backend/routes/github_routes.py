from fastapi import Request
import requests
from typing import Optional
import base64
import urllib.parse

async def get_repo_tree(owner: str, repo: str, token: str) -> dict:
    try:
        # First try to get the default branch
        repo_response = requests.get(
            f"https://api.github.com/repos/{owner}/{repo}",
            headers={
                "Authorization": f"Bearer {token}",
                "Accept": "application/vnd.github.v3+json",
            },
        )
        
        if repo_response.status_code != 200:
            return {"error": "Failed to fetch repository information"}
            
        default_branch = repo_response.json().get('default_branch', 'main')
        
        # Then get the tree using the default branch
        response = requests.get(
            f"https://api.github.com/repos/{owner}/{repo}/git/trees/{default_branch}?recursive=1",
            headers={
                "Authorization": f"Bearer {token}",
                "Accept": "application/vnd.github.v3+json",
            },
        )
        
        if response.status_code != 200:
            return {"error": "Failed to fetch repository contents"}
            
        return response.json()
    except Exception as e:
        return {"error": str(e)}

async def get_file_content(owner: str, repo: str, path: str, token: str) -> dict:
    try:
        # URL encode the path to handle special characters
        encoded_path = urllib.parse.quote(path)
        
        # Get the file content using the contents API
        response = requests.get(
            f"https://api.github.com/repos/{owner}/{repo}/contents/{encoded_path}",
            headers={
                "Authorization": f"Bearer {token}",
                "Accept": "application/vnd.github.v3+json",
            },
        )
        
        if response.status_code != 200:
            return {"error": "Failed to fetch file contents"}
        
        data = response.json()
        
        if isinstance(data, dict):
            return {
                "content": data.get("content", ""),
                "encoding": data.get("encoding", "base64"),
                "type": "file",
                "name": path.split("/")[-1],
            }
        else:
            return {"error": "Invalid response format"}
        
    except Exception as e:
        return {"error": str(e)}

def build_tree(items: dict) -> list:
    if "error" in items:
        return []
        
    root = []
    paths = {}
    
    for item in items.get('tree', []):
        parts = item['path'].split('/')
        current = root
        
        for i, part in enumerate(parts):
            full_path = '/'.join(parts[:i+1])
            
            if full_path not in paths:
                new_node = {
                    'name': part,
                    'path': full_path,
                    'type': 'tree' if i < len(parts) - 1 or item['type'] == 'tree' else 'file',
                    'children': [] if i < len(parts) - 1 or item['type'] == 'tree' else None
                }
                current.append(new_node)
                paths[full_path] = new_node
                current = new_node['children'] if new_node['children'] is not None else []
            else:
                current = paths[full_path]['children'] if paths[full_path]['children'] is not None else []
    
    return root