import numpy as np
import numpy.random as cnp

def draw_bitstrings_minenc(angles, qnode, QUBO_matrix, nbitstrings):
    """
    Function to sample nbitstrings unique bitstrings from the output of the QC
    """
    nc = len(QUBO_matrix)
    data = qnode(angles)
    clist = data[::2] + data[1::2]
    blist = []
    for p in range(nc):
        if clist[p] == 0:
            blist.append(0.5)
        else:
            blist.append(data[2 * p + 1] / clist[p])

    list_of_bitstrings = set()
    rz1 = cnp.random.RandomState()

    while len(list_of_bitstrings) < nbitstrings:
        bitstring = tuple(rz1.choice(2, p=[1 - bitprob, bitprob]) for bitprob in blist)
        list_of_bitstrings.add(bitstring)

    return [np.array(bitstring) for bitstring in list_of_bitstrings]