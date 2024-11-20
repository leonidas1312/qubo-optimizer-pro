from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from typing import Dict, Any
from backend.solver import solve_qubo
import tempfile
import os

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
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
            matrix = np.load(temp_file.name)
            
        # Clean up the temporary file
        os.unlink(temp_file.name)
        
        # Convert numpy array to Python list for JSON serialization
        matrix_list = matrix.tolist()
        
        return {"matrix": matrix_list}
    except Exception as e:
        return {"error": str(e)}

@app.post("/api/solve")
async def solve(data: Dict[Any, Any]):
    try:
        matrix = np.array(data["matrix"])
        solver_type = data.get("solver", "tabu-search")
        parameters = data.get("parameters", {})
        
        # Convert parameters to appropriate types
        if solver_type == "simulated-annealing":
            parameters = {
                "initial_temperature": float(parameters.get("initial_temperature", 1000)),
                "cooling_rate": float(parameters.get("cooling_rate", 0.99)),
                "max_iterations": int(parameters.get("max_iterations", 1000))
            }
        elif solver_type == "quantum-inspired":
            parameters = {
                "num_layers": int(parameters.get("num_layers", 2)),
                "max_iters": int(parameters.get("max_iters", 10)),
                "nbitstrings": int(parameters.get("nbitstrings", 5)),
                "opt_time": float(parameters.get("opt_time", 1.0)),
                "rl_time": float(parameters.get("rl_time", 1.0)),
                "initial_temperature": float(parameters.get("initial_temperature", 10.0))
            }
        elif solver_type == "genetic-algorithm":
            parameters = {
                "pop_size": int(parameters.get("pop_size", 50)),
                "num_generations": int(parameters.get("num_generations", 100)),
                "mutation_rate": float(parameters.get("mutation_rate", 0.01))
            }
        
        # Call the solver function with the processed parameters
        best_solution, best_cost, iterations_cost, time = solve_qubo(
            qubo_matrix=matrix,
            solver_type=solver_type,
            **parameters
        )
        
        return {
            "solution": best_solution.tolist(),
            "cost": float(best_cost),
            "iterations_cost": [float(c) for c in iterations_cost],
            "time": time
        }
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)