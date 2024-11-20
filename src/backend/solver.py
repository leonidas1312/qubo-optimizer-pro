import numpy as np
from typing import Tuple, List, AsyncGenerator
from algorithms.tabu_search import tabu_search
from algorithms.simulated_annealing import simulated_annealing
from algorithms.quantum_inspired import quantum_inspired
from algorithms.genetic_algorithm import genetic_algorithm
from sse_starlette.sse import EventSourceResponse
import json
import asyncio

async def solve_qubo_stream(
    qubo_matrix: np.ndarray,
    solver_type: str = "tabu-search",
    parameters: dict = None,
    constant: float = 0.0
) -> EventSourceResponse:
    """
    Solve QUBO problem using the specified solver and stream results.
    """
    if parameters is None:
        parameters = {}
    
    solvers = {
        "tabu-search": lambda m, c, p: tabu_search(
            qubo_matrix=m,
            constant=c,
            max_iterations=p.get('max-iterations', 1000),
            tabu_tenure=p.get('tabu-tenure', 10),
            neighborhood_size=p.get('neighborhood-size', 10)
        ),
        "simulated-annealing": lambda m, c, p: simulated_annealing(
            qubo_matrix=m,
            constant=c,
            initial_temperature=p.get('initial_temperature', 1000),
            cooling_rate=p.get('cooling_rate', 0.99),
            max_iterations=p.get('max_iterations', 1000)
        ),
        "quantum-inspired": quantum_inspired,
        "genetic-algorithm": lambda m, c, p: genetic_algorithm(
            qubo_matrix=m,
            constant=c,
            pop_size=p.get('pop_size', 50),
            num_generations=p.get('num_generations', 100),
            mutation_rate=p.get('mutation_rate', 0.01)
        )
    }
    
    if solver_type not in solvers:
        raise ValueError(f"Unknown solver type: {solver_type}")
    
    solver_generator = solvers[solver_type](qubo_matrix, constant, parameters)

    async def event_generator():
        try:
            async for solution, cost, iterations_cost, time_taken in solver_generator:
                yield {
                    "data": json.dumps({
                        "solution": solution.tolist() if solution is not None else None,
                        "cost": float(cost),
                        "iterations_cost": [float(c) for c in iterations_cost],
                        "time": time_taken
                    })
                }
        except Exception as e:
            yield {"data": json.dumps({"error": str(e)})}

    return EventSourceResponse(event_generator())
