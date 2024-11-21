import numpy as np
import copy
import time
import pennylane as qml

def calculate_cost(angles, qnode, QUBO_matrix, const):
    """
    Function to calculate a value for the cost function
    """
    start_time1 = time.time()
    nc = len(QUBO_matrix)
    data = qnode(angles)
    clist = data[::2] + data[1::2]
    blist = []
    for p in range(nc):
        if clist[p] == 0:
            blist.append(0.5)
        else:
            blist.append(data[2 * p + 1] / clist[p])

    end_time1 = time.time()
    print(f"Time running the qc and getting back results : " + str(end_time1 - start_time1))
    
    start_time_opt = time.time()
    blist = copy.deepcopy(np.array(blist))
    prob_matrix = np.outer(blist, blist)
    prob_diag = np.diag(prob_matrix)
    mat_diag = np.diag(QUBO_matrix)
    totcost = np.multiply(prob_matrix, QUBO_matrix).sum()
    subtract_cost = np.multiply(prob_diag, mat_diag).sum()
    add_cost = np.multiply(blist, mat_diag).sum()
    quantum_cost = totcost - subtract_cost + add_cost + const
    
    end_time_opt = time.time()
    print(f"Time to estimate cost : " + str(end_time_opt - start_time_opt))
    
    return quantum_cost