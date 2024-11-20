import numpy as np
import time
from typing import Generator, Tuple

def compute_cost(qubo_matrix, solution, constant):
    """
    Computes the cost for a given solution based on the QUBO matrix and constant.
    """
    return solution @ qubo_matrix @ solution.T + constant

def simulated_annealing(qubo_matrix, constant, initial_temperature=1000, cooling_rate=0.99, max_iterations=1000) -> Generator[Tuple[np.ndarray, float, list, float], None, None]:
    """
    Implements Simulated Annealing for QUBO optimization with progress updates.
    """
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

        # Yield current progress
        elapsed_time = time.time() - start_time
        yield best_solution, best_cost, costs_per_iteration, elapsed_time

        # Stop if the temperature is too low
        if temperature < 1e-6:
            break

    # Final yield
    elapsed_time = time.time() - start_time
    yield best_solution, best_cost, costs_per_iteration, elapsed_time
