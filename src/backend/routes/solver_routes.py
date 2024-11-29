from fastapi import APIRouter, UploadFile, File
from typing import Dict, Any
import numpy as np
import tempfile
import os
from backend.solver import solve_qubo

router = APIRouter()

@router.post("/load-matrix")
async def load_matrix(file: UploadFile = File(...)):
    try:
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_file.flush()
            data = np.load(temp_file.name, allow_pickle=True)
        os.unlink(temp_file.name)

        if isinstance(data, np.ndarray) and data.shape == (2,):
            matrix = data[0]
            constant = float(data[1])
        else:
            raise ValueError("Invalid file format: Expected array with shape (2,)")

        return {
            "matrix": matrix.tolist(),
            "constant": constant
        }
    except Exception as e:
        return {"error": str(e)}

@router.post("/solve")
async def solve(data: Dict[Any, Any]):
    try:
        # Extract solver configuration
        solver = data.get("solver", {})
        dataset = data.get("dataset", {})
        hardware = data.get("hardware", {})

        # Configure solver parameters based on hardware
        solver_parameters = {
            **solver.get("solver_parameters", {}),
            "hardware_type": hardware.get("provider_type"),
            "hardware_specs": hardware.get("specs", {})
        }

        # Load dataset
        matrix = np.array(dataset.get("matrix", []))
        constant = float(dataset.get("constant", 0.0))

        # Run optimization
        best_solution, best_cost, iterations_cost, time_taken = solve_qubo(
            qubo_matrix=matrix,
            solver_type=solver.get("solver_type", "tabu-search"),
            parameters=solver_parameters,
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