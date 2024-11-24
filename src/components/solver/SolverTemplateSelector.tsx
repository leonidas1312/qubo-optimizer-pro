import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Star, Cpu, Target, Dna } from "lucide-react";

interface SolverTemplate {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  costFunction: string;
  algorithmLogic: string;
  defaultParameters: Record<string, any>;
}

const solverTemplates: SolverTemplate[] = [
  {
    id: "simulated-annealing",
    name: "Simulated Annealing",
    icon: <Star className="h-6 w-6" />,
    description: "A probabilistic technique for approximating the global optimum of a given function.",
    costFunction: `def compute_cost(qubo_matrix, solution, constant):
    return solution @ qubo_matrix @ solution.T + constant`,
    algorithmLogic: `def simulated_annealing(qubo_matrix, constant, parameters):
    current_solution = np.random.randint(0, 2, num_vars)
    current_cost = compute_cost(qubo_matrix, current_solution, constant)
    best_solution = current_solution.copy()
    best_cost = current_cost`,
    defaultParameters: {
      initial_temperature: 1000,
      cooling_rate: 0.99,
      max_iterations: 1000
    }
  },
  {
    id: "quantum-inspired",
    name: "Quantum-Inspired",
    icon: <Cpu className="h-6 w-6" />,
    description: "A hybrid quantum-classical algorithm combining quantum circuit simulation with reinforcement learning.",
    costFunction: `def quantum_cost(state_vector, qubo_matrix):
    return np.real(state_vector.conj() @ qubo_matrix @ state_vector)`,
    algorithmLogic: `def quantum_inspired(qubo_matrix, constant, parameters):
    circuit = create_quantum_circuit(parameters)
    result = optimize_parameters(circuit, qubo_matrix)
    return sample_solutions(result)`,
    defaultParameters: {
      num_layers: 2,
      max_iterations: 100,
      num_samples: 1000
    }
  },
  {
    id: "tabu-search",
    name: "Tabu Search",
    icon: <Target className="h-6 w-6" />,
    description: "A metaheuristic search method that uses memory structures to avoid revisiting recent solutions.",
    costFunction: `def evaluate_solution(solution, qubo_matrix, constant):
    return solution @ qubo_matrix @ solution.T + constant`,
    algorithmLogic: `def tabu_search(qubo_matrix, constant, parameters):
    current = generate_initial_solution()
    tabu_list = []
    best_solution = current
    for _ in range(max_iterations):
        neighbors = generate_neighbors(current)`,
    defaultParameters: {
      tabu_tenure: 10,
      max_iterations: 1000,
      neighborhood_size: 20
    }
  },
  {
    id: "genetic-algorithm",
    name: "Genetic Algorithm",
    icon: <Dna className="h-6 w-6" />,
    description: "An evolutionary algorithm that mimics natural selection to optimize solutions.",
    costFunction: `def fitness_function(individual, qubo_matrix, constant):
    return -1 * (individual @ qubo_matrix @ individual.T + constant)`,
    algorithmLogic: `def genetic_algorithm(qubo_matrix, constant, parameters):
    population = initialize_population()
    for generation in range(num_generations):
        offspring = crossover(population)
        mutate(offspring)`,
    defaultParameters: {
      population_size: 100,
      mutation_rate: 0.01,
      num_generations: 50
    }
  }
];

interface SolverTemplateSelectorProps {
  onSelectTemplate: (template: SolverTemplate) => void;
}

export const SolverTemplateSelector = ({ onSelectTemplate }: SolverTemplateSelectorProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Choose a Solver Template</h3>
      <ScrollArea className="h-[400px] pr-4">
        <div className="grid grid-cols-1 gap-4">
          {solverTemplates.map((template) => (
            <Card
              key={template.id}
              className="p-4 hover:bg-accent cursor-pointer transition-colors"
              onClick={() => {
                onSelectTemplate(template);
                toast.success(`Selected ${template.name} template`);
              }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  {template.icon}
                </div>
                <div>
                  <h4 className="font-medium">{template.name}</h4>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};