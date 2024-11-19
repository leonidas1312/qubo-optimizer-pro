import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

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

const AlgorithmCard = ({ algorithm, data }: { algorithm: string; data: any }) => {
  return (
    <Card className="group relative p-6 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer overflow-hidden">
      <div className="space-y-4">
        <h3 className="text-2xl font-bold">{data.title}</h3>
        <p className="text-muted-foreground">{data.description}</p>
        
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {data.features.map((feature: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {feature}
                </Badge>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Implementation Details</h4>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  {data.technicalDetails.implementation.map((detail: string, index: number) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Parameters</h4>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  {data.technicalDetails.parameters.map((param: string, index: number) => (
                    <li key={index}>{param}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Mathematical Formulation</h4>
                <div className="p-4 bg-muted rounded-md">
                  <InlineMath>{data.formula}</InlineMath>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Example</h4>
                <pre className="p-4 bg-muted rounded-md whitespace-pre-wrap text-sm">
                  {data.example}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Computational Complexity</h4>
                <p className="text-muted-foreground">{data.technicalDetails.complexity}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const Solvers = () => {
  return (
    <DashboardLayout>
      <div className="container py-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Optimization Algorithms</h1>
        <div className="grid gap-8">
          {Object.entries(algorithms).map(([key, data]) => (
            <AlgorithmCard key={key} algorithm={key} data={data} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Solvers;