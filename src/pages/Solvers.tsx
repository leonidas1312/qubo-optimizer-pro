import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AlgorithmCard } from "@/components/solver/AlgorithmCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const algorithms = {
  "quantum-inspired": {
    title: "Quantum-Inspired Optimization",
    description: "A hybrid quantum-classical approach that combines variational quantum circuits with reinforcement learning for solving QUBO problems efficiently.",
    features: [
      "Logarithmic reduction in qubit requirements",
      "Hybrid quantum-classical optimization",
      "Reinforcement learning enhancement",
      "Scalable to large problem sizes"
    ],
    technicalDetails: {
      implementation: [
        "Uses minimal encoding for quantum circuit optimization",
        "Sequential two-part algorithm combining VQC and RL",
        "Supports multiple bitstring sampling",
        "Adaptive temperature control in RL search"
      ],
      parameters: [
        "Number of circuit layers",
        "Maximum iterations",
        "Number of bitstring samples",
        "Optimization and RL time allocation",
        "Initial temperature"
      ],
      complexity: "Logarithmic qubit scaling: n classical vars → log₂(n) qubits"
    },
    formula: "min_{x ∈ {0,1}^n} x^T Q x",
    example: "128 classical variables → 8 qubits\n256 variables → 9 qubits\n4096 variables → 13 qubits"
  },
  "simulated-annealing": {
    title: "Simulated Annealing",
    description: "A probabilistic technique for approximating the global optimum of a given function, inspired by the physical process of heating and controlled cooling of materials.",
    features: [
      "Probabilistic acceptance of worse solutions",
      "Temperature-controlled exploration",
      "Gradual convergence to optimal solution",
      "Effective for large search spaces"
    ],
    technicalDetails: {
      implementation: [
        "Iterative local search with cooling schedule",
        "Metropolis acceptance criterion",
        "Neighborhood exploration strategy",
        "Adaptive step size control"
      ],
      parameters: [
        "Initial temperature",
        "Cooling rate",
        "Number of iterations",
        "Neighborhood size"
      ],
      complexity: "O(n²) per iteration, where n is the problem size"
    },
    formula: "P(ΔE) = e^{-ΔE/(k_B T)}",
    example: "Temperature schedule: T(t) = T₀ * α^t\nwhere α is the cooling rate (0.8-0.99)"
  }
};

const Solvers = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("quantum-inspired");

  const algorithmData = algorithms[selectedAlgorithm as keyof typeof algorithms];

  return (
    <DashboardLayout>
      <div className="container py-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">Optimization Algorithms</h1>
            <div className="w-[250px]">
              <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
                <SelectTrigger>
                  <SelectValue placeholder="Select algorithm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quantum-inspired">Quantum-Inspired Optimization</SelectItem>
                  <SelectItem value="simulated-annealing">Simulated Annealing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="w-full">
            <AlgorithmCard {...algorithmData} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Solvers;