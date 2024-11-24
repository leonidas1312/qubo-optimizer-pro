import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Star, Cpu, Target, Dna } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const templates = [
  {
    id: "simulated-annealing",
    name: "Simulated Annealing",
    icon: <Star className="h-8 w-8" />,
    description: "A probabilistic technique for approximating the global optimum.",
    parameters: {
      initial_temperature: 1000,
      cooling_rate: 0.99,
      max_iterations: 1000
    }
  },
  {
    id: "quantum-inspired",
    name: "Quantum-Inspired",
    icon: <Cpu className="h-8 w-8" />,
    description: "A hybrid quantum-classical algorithm combining quantum circuit simulation with reinforcement learning.",
    parameters: {
      num_layers: 2,
      max_iterations: 100,
      num_samples: 1000
    }
  },
  {
    id: "tabu-search",
    name: "Tabu Search",
    icon: <Target className="h-8 w-8" />,
    description: "A metaheuristic search method using memory structures.",
    parameters: {
      tabu_tenure: 10,
      max_iterations: 1000,
      neighborhood_size: 20
    }
  },
  {
    id: "genetic-algorithm",
    name: "Genetic Algorithm",
    icon: <Dna className="h-8 w-8" />,
    description: "An evolutionary algorithm that mimics natural selection.",
    parameters: {
      population_size: 100,
      mutation_rate: 0.01,
      num_generations: 50
    }
  }
];

export const SolverTemplatesSection = () => {
  const navigate = useNavigate();

  const handleUseSolver = (template: typeof templates[0]) => {
    toast.success(`Selected ${template.name} solver`);
    navigate('/playground', { state: { selectedSolver: template } });
  };

  return (
    <div className="space-y-12 py-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-center">Solver Templates</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto">
          Get started with our pre-built solver templates. Each template includes optimized implementations
          of popular algorithms for solving QUBO problems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        {templates.map((template) => (
          <Card 
            key={template.id} 
            className="p-6 bg-black/50 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  {template.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Parameters:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {Object.entries(template.parameters).map(([key, value]) => (
                    <li key={key}>
                      {key}: <span className="text-primary">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                onClick={() => handleUseSolver(template)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800"
              >
                <Play className="mr-2 h-4 w-4" />
                Use Solver
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};