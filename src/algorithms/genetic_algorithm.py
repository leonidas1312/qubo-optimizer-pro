# Genetic Algorithm Implementation
import numpy as np
import time

def compute_cost(qubo_matrix, solution, constant):
    """
    Computes the cost for a given solution based on the QUBO matrix and constant.
    """
    return solution @ qubo_matrix @ solution.T + constant

def initialize_population(pop_size, num_vars):
    """
    Initializes the population with random binary solutions.
    """
    return np.random.randint(0, 2, (pop_size, num_vars))

def select_parents(population, fitness, num_parents):
    """
    Selects parents based on fitness-proportional selection (roulette wheel selection).
    """
    probabilities = fitness / fitness.sum()
    selected_indices = np.random.choice(len(population), num_parents, p=probabilities)
    return population[selected_indices]

def crossover(parents, num_offspring):
    """
    Performs single-point crossover to generate offspring.
    """
    num_vars = parents.shape[1]
    offspring = []
    for _ in range(num_offspring):
        parent1, parent2 = parents[np.random.choice(len(parents), 2, replace=False)]
        crossover_point = np.random.randint(1, num_vars)
        child = np.concatenate((parent1[:crossover_point], parent2[crossover_point:]))
        offspring.append(child)
    return np.array(offspring)

def mutate(offspring, mutation_rate):
    """
    Performs mutation by flipping bits with a given mutation rate.
    """
    for individual in offspring:
        for i in range(len(individual)):
            if np.random.rand() < mutation_rate:
                individual[i] = 1 - individual[i]  # Flip the bit
    return offspring

def genetic_algorithm(qubo_matrix, constant, parameters=None):
    """
    Implements the Genetic Algorithm for QUBO optimization.
    
    Args:
        qubo_matrix: The QUBO matrix
        constant: Constant term in the QUBO formulation
        parameters: Dictionary containing algorithm parameters
            - pop_size: Population size (default: 50)
            - num_generations: Number of generations (default: 100)
            - mutation_rate: Mutation rate (default: 0.01)
    
    Returns:
        Tuple containing:
        - Best solution found (numpy array)
        - Best cost found (float)
        - List of costs per generation (list of floats)
        - Time taken (float)
    """
    if parameters is None:
        parameters = {}
    
    pop_size = parameters.get('pop_size', 50)
    num_generations = parameters.get('num_generations', 100)
    mutation_rate = parameters.get('mutation_rate', 0.01)
    
    num_vars = qubo_matrix.shape[0]
    population = initialize_population(pop_size, num_vars)
    best_solution = None
    best_cost = float('inf')
    costs_per_generation = []

    start_time = time.time()

    for generation in range(num_generations):
        # Compute fitness (negative cost, because we minimize cost)
        fitness = -np.array([compute_cost(qubo_matrix, individual, constant) for individual in population])
        
        # Track the best solution
        current_best_index = np.argmax(fitness)
        current_best_solution = population[current_best_index]
        current_best_cost = -fitness[current_best_index]

        if current_best_cost < best_cost:
            best_solution = current_best_solution
            best_cost = current_best_cost

        # Store the best cost for this generation
        costs_per_generation.append(best_cost)

        # Selection
        parents = select_parents(population, fitness, pop_size // 2)

        # Crossover
        offspring = crossover(parents, pop_size - len(parents))

        # Mutation
        offspring = mutate(offspring, mutation_rate)

        # Create new population
        population = np.vstack((parents, offspring))

    end_time = time.time()
    elapsed_time = end_time - start_time

    return best_solution, best_cost, costs_per_generation, elapsed_time