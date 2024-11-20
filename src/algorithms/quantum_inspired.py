import pennylane as qml
import numpy as np
import time
from .quantum.circuit import pennylane_HEcirc
from .quantum.cost_functions import calmecf, compute_cost
from .quantum.rl_search import simplified_rl_search

def draw_bitstrings_minenc(angles, nqq, my_qnode, QUBO_matrix, nbitstrings):
    """Sample bitstrings from quantum circuit output"""
    nc = len(QUBO_matrix)
    data = my_qnode(angles)
    clist = data[::2] + data[1::2]
    blist = []
    
    for p in range(nc):
        if clist[p] == 0:
            blist.append(0.5)
        else:
            blist.append(data[2 * p + 1] / clist[p])

    list_of_bitstrings = set()
    rz1 = np.random.RandomState()

    while len(list_of_bitstrings) < nbitstrings:
        bitstring = tuple(rz1.choice(2, p=[1 - bitprob, bitprob]) for bitprob in blist)
        list_of_bitstrings.add(bitstring)

    return [np.array(bitstring) for bitstring in list_of_bitstrings]

def OPT_step(opt, theta, my_qnode, QUBO_matrix, const):
    """One optimizer step"""
    theta, adam_cost = opt.step_and_cost(
        lambda x: calmecf(x, my_qnode, QUBO_matrix, const), 
        theta
    )
    return theta, adam_cost

def quantum_inspired(QUBO_m, c, num_layers, max_iters, nbitstrings, opt_time, rl_time,
                    initial_temperature, verbose=False, progress_callback=None):
    """
    Quantum-inspired optimization with progress updates
    """
    nqq = int(np.ceil(np.log2(len(QUBO_m)))) + 1
    num_shots = 10000
    dev = qml.device("lightning.qubit", wires=nqq, shots=num_shots)
    my_qnode = qml.QNode(
        lambda x: pennylane_HEcirc(x, nqq, num_layers), 
        dev, 
        diff_method="parameter-shift"
    )

    opt = qml.AdamOptimizer(stepsize=0.01)
    theta = np.array([2 * np.pi * np.random.rand() for _ in range(nqq * num_layers)], requires_grad=True)

    best_theta = []
    best_cost = float('inf')
    best_cost_opt = float('inf')
    best_bitstring = None

    for iteration in range(max_iters):
        # Optimization phase
        end_time = time.time() + opt_time
        while time.time() < end_time:
            theta, opt_cost = OPT_step(opt, theta, my_qnode, QUBO_m, c)
            
            if progress_callback:
                progress_callback({
                    'phase': 'optimization',
                    'iteration': iteration,
                    'cost': opt_cost
                })
            
            if opt_cost < best_cost_opt:
                best_cost_opt = opt_cost
                best_theta = theta

        # Sample and improve solutions
        drawn_bitstrings = draw_bitstrings_minenc(best_theta, nqq, my_qnode, QUBO_m, nbitstrings)
        
        for draw_bs in drawn_bitstrings:
            best_bs_bb, current_cost, progress_rl_costs = simplified_rl_search(
                draw_bs,
                QUBO_m,
                c,
                rl_time / len(drawn_bitstrings),
                temperature=initial_temperature,
                verbose=verbose,
                progress_callback=progress_callback
            )

            if current_cost < best_cost:
                best_cost = current_cost
                best_bitstring = best_bs_bb

            if progress_callback:
                progress_callback({
                    'phase': 'rl_search',
                    'iteration': iteration,
                    'current_cost': current_cost,
                    'best_cost': best_cost
                })

    return best_bitstring, best_cost, progress_rl_costs, time.time()