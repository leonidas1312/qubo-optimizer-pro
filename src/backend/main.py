from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from typing import Dict, Any
import json
from backend.solver import solve_qubo_stream
import tempfile
import os

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
        
        # Call the solver function with streaming
        return await solve_qubo_stream(
            qubo_matrix=matrix,
            solver_type=solver_type,
            parameters=parameters,
            constant=constant
        )
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
