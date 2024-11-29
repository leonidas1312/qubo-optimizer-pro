import numpy as np
import time
from typing import Dict, Any, Tuple, List
import logging

class HardwareExecutor:
    """
    Manages hardware resource allocation and execution for QUBO optimization.
    """
    def __init__(self, hardware_config: Dict[str, Any]):
        self.provider_type = hardware_config.get("provider_type", "CPU")
        self.specs = hardware_config.get("specs", {})
        self.cost_per_hour = float(hardware_config.get("cost_per_hour", 0.0))
        self._validate_config()
        
    def _validate_config(self):
        """Validates hardware configuration."""
        valid_providers = ["CPU", "GPU", "QPU"]
        if self.provider_type not in valid_providers:
            raise ValueError(f"Invalid provider type. Must be one of {valid_providers}")
            
        required_specs = {
            "CPU": ["cores", "memory"],
            "GPU": ["cuda_cores", "memory", "compute_capability"],
            "QPU": ["qubits", "connectivity"]
        }
        
        for spec in required_specs[self.provider_type]:
            if spec not in self.specs:
                raise ValueError(f"Missing required spec for {self.provider_type}: {spec}")

    def estimate_cost(self, problem_size: int, max_iterations: int) -> float:
        """Estimates cost for running the optimization."""
        # Base computation time estimation (in hours)
        base_time = self._estimate_computation_time(problem_size, max_iterations)
        return base_time * self.cost_per_hour

    def _estimate_computation_time(self, problem_size: int, max_iterations: int) -> float:
        """Estimates computation time in hours based on problem parameters."""
        # Basic estimation model - can be refined based on benchmarks
        if self.provider_type == "CPU":
            time_per_iteration = problem_size ** 2 * 1e-6  # microseconds
        elif self.provider_type == "GPU":
            time_per_iteration = problem_size ** 2 * 1e-7  # GPU is ~10x faster
        else:  # QPU
            time_per_iteration = problem_size * 1e-5  # Different scaling for quantum

        total_seconds = (time_per_iteration * max_iterations) / 1e6
        return total_seconds / 3600  # Convert to hours

    def execute(self, 
                solver_func: callable, 
                qubo_matrix: np.ndarray,
                solver_params: Dict[str, Any],
                constant: float = 0.0) -> Tuple[np.ndarray, float, List[float], float]:
        """
        Executes the optimization on the specified hardware.
        
        Args:
            solver_func: The solver function to execute
            qubo_matrix: The QUBO matrix
            solver_params: Solver-specific parameters
            constant: Constant term in QUBO formulation
            
        Returns:
            Tuple containing:
            - Best solution found (numpy array)
            - Best cost found (float)
            - List of costs per iteration (list of floats)
            - Time taken (float)
        """
        logging.info(f"Executing on {self.provider_type} with specs: {self.specs}")
        
        # Record start time for billing
        start_time = time.time()
        
        try:
            # Execute the solver
            if self.provider_type == "GPU":
                # Move data to GPU if available
                try:
                    import cupy as cp
                    qubo_matrix = cp.array(qubo_matrix)
                    result = solver_func(qubo_matrix, constant, solver_params)
                    # Move results back to CPU
                    result = tuple(cp.asnumpy(r) if isinstance(r, cp.ndarray) else r 
                                 for r in result)
                except ImportError:
                    logging.warning("CUDA not available, falling back to CPU execution")
                    result = solver_func(qubo_matrix, constant, solver_params)
            else:
                # CPU execution
                result = solver_func(qubo_matrix, constant, solver_params)
            
            execution_time = time.time() - start_time
            
            # Calculate billing
            cost_incurred = (execution_time / 3600) * self.cost_per_hour
            logging.info(f"Execution completed. Time: {execution_time:.2f}s, Cost: ${cost_incurred:.4f}")
            
            return result
            
        except Exception as e:
            logging.error(f"Execution failed: {str(e)}")
            raise RuntimeError(f"Hardware execution failed: {str(e)}")