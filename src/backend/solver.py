import numpy as np
from typing import Tuple, List
from ..algorithms.tabu_search import tabu_search
from ..algorithms.simulated_annealing import simulated_annealing
from ..algorithms.quantum_inspired import quantum_inspired
from ..algorithms.genetic_algorithm import genetic_algorithm

def solve_qubo(
    qubo_matrix: np.ndarray,
    solver_type: str = "tabu-search",
    **parameters
) -> Tuple[np.ndarray, float, List[float], float]:
    """
    Solve QUBO problem using the specified solver.
    
    Args:
        qubo_matrix: The QUBO matrix
        solver_type: Type of solver to use
        **parameters: Additional parameters for the solver
    
    Returns:
        Tuple containing:
        - Best solution found
        - Best cost found
        - List of costs per iteration
        - Time taken
    """
    # Add a small constant to ensure the matrix is symmetric
    constant = 0.0
    
    solvers = {
        "tabu-search": tabu_search,
        "simulated-annealing": simulated_annealing,
        "quantum-inspired": quantum_inspired,
        "genetic-algorithm": genetic_algorithm
    }
    
    if solver_type not in solvers:
        raise ValueError(f"Unknown solver type: {solver_type}")
    
    solver_func = solvers[solver_type]
    return solver_func(qubo_matrix, constant, **parameters)
