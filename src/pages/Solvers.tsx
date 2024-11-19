import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AlgorithmCard } from "@/components/solver/AlgorithmCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Check } from "lucide-react";

const algorithms = {
  "quantum-inspired": {
    title: "Hardware-Agnostic Approach",
    description: "Recognizing the diversity of quantum hardware platforms (superconducting, photonic, neutral atoms, ion traps, etc.), our approach remains hardware-agnostic. Major quantum hardware manufacturers have partnered with us.",
    features: [
      "Hardware independence",
      "Multiple platform support",
      "Vendor partnerships",
      "Scalable architecture"
    ],
    technicalDetails: {
      implementation: [
        "Abstract hardware interface layer",
        "Platform-specific optimizations",
        "Unified quantum instruction set",
        "Dynamic resource allocation"
      ],
      parameters: [
        "Hardware configuration",
        "Platform selection",
        "Optimization level",
        "Resource constraints",
        "Execution mode"
      ],
      complexity: "O(log n) quantum resources with classical preprocessing"
    },
    formula: "\\min_{x ∈ {0,1}^n} x^T Q x",
    example: "Supports multiple hardware backends:\n- Superconducting qubits\n- Ion traps\n- Photonic systems\n- Neutral atoms"
  },
  "simulated-annealing": {
    title: "Strategic Deployment of Quantum Solutions",
    description: "While long-term quantum computing power is promising, its immediate application is limited. We emphasize the importance of strategically deploying quantum solutions for tangible economic value, avoiding purely exploratory applications.",
    features: [
      "Strategic value focus",
      "Economic impact driven",
      "Practical applications",
      "ROI optimization"
    ],
    technicalDetails: {
      implementation: [
        "Value assessment framework",
        "Application prioritization",
        "Resource optimization",
        "Performance benchmarking"
      ],
      parameters: [
        "Business impact metrics",
        "Resource requirements",
        "Implementation timeline",
        "Cost-benefit analysis"
      ],
      complexity: "Deployment complexity varies by application"
    },
    formula: "ROI = \\frac{\\text{Quantum Advantage}}{\\text{Implementation Cost}}",
    example: "Strategic deployment examples:\n- Supply chain optimization\n- Financial portfolio management\n- Drug discovery acceleration\n- Climate modeling"
  }
};

const Solvers = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("quantum-inspired");

  return (
    <DashboardLayout>
      <div className="container py-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-white">Quantum Methods</h1>
            <div className="flex gap-4">
              <button className="p-2 rounded-full bg-background/20 backdrop-blur-sm">
                <Check className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(algorithms).map(([key, algorithm]) => (
              <div key={key} className="group">
                <AlgorithmCard {...algorithm} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Solvers;