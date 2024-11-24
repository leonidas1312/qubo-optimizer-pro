import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Star, Cpu, Target, Dna } from "lucide-react";
import { toast } from "sonner";
import { AlgorithmCard } from "@/components/solver/AlgorithmCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const templates = [
  {
    id: "simulated-annealing",
    name: "Simulated Annealing",
    icon: <Star className="h-8 w-8" />,
    description: "A probabilistic technique for approximating the global optimum.",
    code: `def simulated_annealing(qubo_matrix, constant, parameters):
    current_solution = np.random.randint(0, 2, num_vars)
    current_cost = compute_cost(qubo_matrix, current_solution, constant)
    best_solution = current_solution.copy()
    best_cost = current_cost`,
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
    code: `def quantum_inspired(qubo_matrix, constant, parameters):
    circuit = create_quantum_circuit(parameters)
    result = optimize_parameters(circuit, qubo_matrix)
    return sample_solutions(result)`,
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
    code: `def tabu_search(qubo_matrix, constant, parameters):
    current = generate_initial_solution()
    tabu_list = []
    best_solution = current
    for _ in range(max_iterations):
        neighbors = generate_neighbors(current)`,
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
    code: `def genetic_algorithm(qubo_matrix, constant, parameters):
    population = initialize_population()
    for generation in range(num_generations):
        offspring = crossover(population)
        mutate(offspring)`,
    parameters: {
      population_size: 100,
      mutation_rate: 0.01,
      num_generations: 50
    }
  }
];

export const SolverTemplatesSection = () => {
  const handleDownload = (template: typeof templates[0]) => {
    const blob = new Blob([template.code], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.id}.py`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success(`Downloaded ${template.name} template`);
  };

  return (
    <div className="space-y-12 py-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-center">Solver Templates</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto">
          Get started with our pre-built solver templates. Each template includes optimized implementations
          of popular algorithms for solving QUBO problems. Download and customize them for your specific needs.
        </p>
      </div>

      <div className="space-y-16">
        {templates.map((template) => (
          <section key={template.id} className="space-y-6">
            <div className="flex items-center gap-3 px-4">
              {template.icon}
              <h3 className="text-2xl font-semibold">{template.name}</h3>
            </div>

            <Card className="p-6 bg-black/50 backdrop-blur-sm border-white/10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p className="text-muted-foreground">{template.description}</p>
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
                    onClick={() => handleDownload(template)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Template
                  </Button>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto">
                    <code>{template.code}</code>
                  </pre>
                </div>
              </div>
            </Card>
          </section>
        ))}
      </div>
    </div>
  );
};