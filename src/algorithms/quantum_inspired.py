import numpy as np
import pennylane as qml
import time
from .quantum.circuit import pennylane_HEcirc
from .quantum.cost_function import calculate_cost
from .quantum.rl_search import simplified_rl_search
from .quantum.sampling import draw_bitstrings_minenc

def quantum_inspired(qubo_matrix, constant, parameters=None):
    """
    Quantum-Inspired Optimization Algorithm for QUBO problems.
    
    Args:
        qubo_matrix: The QUBO matrix
        constant: Constant term in the QUBO formulation
        parameters: Dictionary containing algorithm parameters
            - num_layers: Number of layers for the quantum circuit (default: 2)
            - max_iters: Maximum iterations (default: 100)
            - nbitstrings: Number of bitstrings to sample (default: 5)
            - opt_time: Optimizer time in seconds (default: 10)
            - rl_time: RL search time in seconds (default: 10)
            - initial_temperature: Starting temperature (default: 10)
    
    Returns:
        Tuple containing:
        - Best solution found (numpy array)
        - Best cost found (float)
        - List of costs per iteration (list of floats)
        - Time taken (float)
    """
    if parameters is None:
        parameters = {}
    
    num_layers = parameters.get('num_layers', 2)
    max_iters = parameters.get('max_iters', 100)
    nbitstrings = parameters.get('nbitstrings', 5)
    opt_time = parameters.get('opt_time', 10)
    rl_time = parameters.get('rl_time', 10)
    initial_temperature = parameters.get('initial_temperature', 10)
    
    nqq = int(np.ceil(np.log2(len(qubo_matrix)))) + 1
    num_shots = 10000
    dev = qml.device("lightning.qubit", wires=nqq, shots=num_shots)
    qnode = qml.QNode(lambda angles: pennylane_HEcirc(angles, nqq), dev, diff_method="parameter-shift")
    p1;
    print(f"Number of classical variables = {len(qubo_matrix)}")
    print(f"Number of qubits for the quantum circuit = {nqq}")
    print(f"Number of layers for the quantum circuit = {num_layers}")
    print(f"Number of shots = {num_shots}")
    print(f"PRINNNNNN1")
    opt = qml.AdamOptimizer(stepsize=0.01)
    print(f"PRINNNNNN2")
    theta = np.array([2 * np.pi * np.random.rand() for _ in range(nqq * num_layers)], requires_grad=True)
    print(f"PRINNNNNN3")
    best_theta = []
    best_cost = float('inf')
    best_cost_opt = float('inf')
    best_bitstring = None
    cost_values = []
    progress_opt_costs = []
    print(f"PRINNNNNN4")
    start_time = time.time()
    for iteration in range(max_iters):
        # Run ADAM optimization
        end_time = time.time() + opt_time
        print(f"MPIKAAA")
        while time.time() < end_time:
            theta, opt_cost = opt.step_and_cost(
                lambda angles: calculate_cost(angles, qnode, qubo_matrix, constant), 
                theta
            )
            
            if opt_cost < best_cost_opt:
                best_cost_opt = opt_cost
                best_theta = theta
            progress_opt_costs.append(best_cost_opt)

        # Sample and improve bitstrings
        drawn_bitstrings = draw_bitstrings_minenc(best_theta, qnode, qubo_matrix, nbitstrings)
        
        for draw_bs in drawn_bitstrings:
            best_bs_bb, current_cost, progress_rl_costs = simplified_rl_search(
                draw_bs,
                qubo_matrix,
                constant,
                rl_time / len(drawn_bitstrings),
                temperature=initial_temperature,
                verbose=True,
            )

            if current_cost < best_cost:
                best_cost = current_cost
                best_bitstring = best_bs_bb

        cost_values.append(best_cost)

    end_time = time.time()
    elapsed_time = end_time - start_time

    return best_bitstring, best_cost, cost_values, elapsed_time