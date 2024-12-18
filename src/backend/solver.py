import numpy as np
from typing import Tuple, List, Dict, Any
from algorithms.tabu_search import tabu_search
from algorithms.simulated_annealing import simulated_annealing
from algorithms.quantum_inspired import quantum_inspired
from algorithms.genetic_algorithm import genetic_algorithm
from algorithms.hardware.executor import HardwareExecutor

def solve_qubo(
    qubo_matrix: np.ndarray,
    solver_type: str = "tabu-search",
    parameters: dict = None,
    constant: float = 0.0,
    hardware_config: Dict[str, Any] = None
) -> Tuple[np.ndarray, float, List[float], float]:
    """
    Solve QUBO problem using the specified solver and hardware.
    
    Args:
        qubo_matrix: The QUBO matrix
        solver_type: Type of solver to use
        parameters: Additional parameters for the solver
        constant: Constant term in the QUBO formulation
        hardware_config: Hardware configuration for execution
    
    Returns:
        Tuple containing:
        - Best solution found
        - Best cost found
        - List of costs per iteration
        - Time taken
    """
    if parameters is None:
        parameters = {}
    
    if hardware_config is None:
        hardware_config = {
            "provider_type": "CPU",
            "specs": {"cores": 1, "memory": "4GB"},
            "cost_per_hour": 0.0
        }
    
    solvers = {
        "tabu-search": lambda m, c, p: tabu_search(
            qubo_matrix=m,
            constant=c,
            max_iterations=p.get('max-iterations', 1000),
            tabu_tenure=p.get('tabu-tenure', 10),
            neighborhood_size=p.get('neighborhood-size', 10)
        ),
        "simulated-annealing": simulated_annealing,
        "quantum-inspired": quantum_inspired,
        "genetic-algorithm": genetic_algorithm
    }
    
    if solver_type not in solvers:
        raise ValueError(f"Unknown solver type: {solver_type}")
    
    solver_func = solvers[solver_type]
    
    # Initialize hardware executor
    executor = HardwareExecutor(hardware_config)
    
    try:
        return executor.execute(solver_func, qubo_matrix, parameters, constant)
    except Exception as e:
        raise RuntimeError(f"Solver failed: {str(e)}")