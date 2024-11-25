import { Star, Cpu, Target, Dna } from "lucide-react";

export const solverTemplates = [
  {
    id: "simulated-annealing",
    name: "Simulated Annealing",
    icon: Star,
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
    icon: Cpu,
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
    icon: Target,
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
    icon: Dna,
    description: "An evolutionary algorithm that mimics natural selection.",
    parameters: {
      population_size: 100,
      mutation_rate: 0.01,
      num_generations: 50
    }
  }
] as const;

export type SolverTemplate = typeof solverTemplates[number];