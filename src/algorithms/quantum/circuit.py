import pennylane as qml
import numpy as np

def pennylane_HEcirc(angles, nqq, n_layers):
    """
    Function to generate a hardware efficient ansatz
    """
    # Apply one layer of hadamards
    for nq_ in range(nqq):
        qml.Hadamard(wires=nq_)

    # Apply layers of single qubit rotations and entangling gates
    for l_ in range(n_layers):
        for i_ in range(nqq):
            qml.RY(angles[i_ + l_ * nqq], wires=i_)

        for j in range(0, nqq, 2):
            if j >= nqq - 1:
                continue
            else:
                qml.CNOT(wires=[j, j + 1])
        for k in range(1, nqq, 2):
            if k >= nqq - 1:
                continue
            else:
                qml.CNOT(wires=[k, k + 1])

    return qml.probs(wires=[i for i in range(nqq)])