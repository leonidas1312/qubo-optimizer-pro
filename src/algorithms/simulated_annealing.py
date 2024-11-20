# Simulated Annealing Algorithm Implementation
import numpy as np
import time

def compute_cost(qubo_matrix, solution, constant):
    """
    Computes the cost for a given solution based on the QUBO matrix and constant.
    """
    return solution @ qubo_matrix @ solution.T + constant

def simulated_annealing(qubo_matrix, constant, parameters=None):
    """
    Implements Simulated Annealing for QUBO optimization.
    
    Args:
        qubo_matrix: The QUBO matrix
        constant: Constant term in the QUBO formulation
        parameters: Dictionary containing algorithm parameters
            - initial_temperature: Starting temperature (default: 1000)
            - cooling_rate: Rate at which temperature decreases (default: 0.99)
            - max_iterations: Maximum number of iterations (default: 1000)
    
    Returns:
        Tuple containing:
        - Best solution found (numpy array)
        - Best cost found (float)
        - List of costs per iteration (list of floats)
        - Time taken (float)
    """
    if parameters is None:
        parameters = {}
    
    initial_temperature = parameters.get('initial_temperature', 1000)
    cooling_rate = parameters.get('cooling_rate', 0.99)
    max_iterations = parameters.get('max_iterations', 1000)
    
    num_vars = qubo_matrix.shape[0]

    # Initialize random solution
    current_solution = np.random.randint(0, 2, num_vars)
    current_cost = compute_cost(qubo_matrix, current_solution, constant)

    best_solution = current_solution.copy()
    best_cost = current_cost

    costs_per_iteration = []
    temperature = initial_temperature

    start_time = time.time()

    for iteration in range(max_iterations):
        # Generate a neighbor by flipping a random bit
        neighbor = current_solution.copy()
        flip_index = np.random.randint(num_vars)
        neighbor[flip_index] = 1 - neighbor[flip_index]  # Flip the bit

        # Compute cost of the neighbor
        neighbor_cost = compute_cost(qubo_matrix, neighbor, constant)

        # Decide whether to accept the neighbor
        cost_difference = neighbor_cost - current_cost
        if cost_difference < 0 or np.random.rand() < np.exp(-cost_difference / temperature):
            current_solution = neighbor
            current_cost = neighbor_cost

            # Update best solution if new solution is better
            if current_cost < best_cost:
                best_solution = current_solution.copy()
                best_cost = current_cost

        # Record the current cost
        costs_per_iteration.append(current_cost)

        # Cool down the temperature
        temperature *= cooling_rate

        # Stop if the temperature is too low
        if temperature < 1e-6:
            break

    end_time = time.time()
    elapsed_time = end_time - start_time

    return best_solution, best_cost, costs_per_iteration, elapsed_time