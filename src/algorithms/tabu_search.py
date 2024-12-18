import numpy as np
import time

def compute_cost(qubo_matrix: np.ndarray, solution: np.ndarray, constant: float) -> float:
    """
    Computes the cost for a given solution based on the QUBO matrix and constant.
    """
    return float(solution @ qubo_matrix @ solution.T + constant)

def tabu_search(
    qubo_matrix: np.ndarray, 
    constant: float = 0.0,
    max_iterations: int = 1000, 
    tabu_tenure: int = 10, 
    neighborhood_size: int = 10
) -> tuple:
    """
    Implements the Tabu Search algorithm for QUBO optimization.
    """
    start_time = time.time()
    num_vars = qubo_matrix.shape[0]
    
    # Initialize random solution
    current_solution = np.random.randint(0, 2, num_vars)
    current_cost = compute_cost(qubo_matrix, current_solution, constant)
    
    best_solution = current_solution.copy()
    best_cost = current_cost
    
    tabu_list = []
    cost_per_iteration = [current_cost]
    
    for iteration in range(max_iterations):
        # Generate neighbors by flipping one bit at a time
        neighbors = []
        neighbor_costs = []
        
        for _ in range(neighborhood_size):
            neighbor = current_solution.copy()
            flip_index = np.random.randint(num_vars)
            neighbor[flip_index] = 1 - neighbor[flip_index]  # Flip the bit
            
            if not any(np.array_equal(neighbor, x) for x in tabu_list):
                neighbors.append(neighbor)
                neighbor_costs.append(compute_cost(qubo_matrix, neighbor, constant))
        
        # Select the best neighbor that is not in the tabu list
        if neighbors:
            best_neighbor_index = np.argmin(neighbor_costs)
            current_solution = neighbors[best_neighbor_index]
            current_cost = neighbor_costs[best_neighbor_index]
            
            # Update tabu list
            tabu_list.append(current_solution.copy())
            if len(tabu_list) > tabu_tenure:
                tabu_list.pop(0)
            
            # Update best solution
            if current_cost < best_cost:
                best_solution = current_solution.copy()
                best_cost = current_cost
        
        # Record the cost for this iteration
        cost_per_iteration.append(current_cost)
    
    end_time = time.time()
    elapsed_time = end_time - start_time
    
    return best_solution, best_cost, cost_per_iteration, elapsed_time