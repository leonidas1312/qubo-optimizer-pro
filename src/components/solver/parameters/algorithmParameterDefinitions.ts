interface Parameter {
  name: string;
  label: string;
  defaultValue: number;
  min: number;
  max: number;
  step: number;
  tooltip: string;
}

interface AlgorithmParameters {
  [key: string]: Parameter[];
}

export const parameters: AlgorithmParameters = {
  "simulated-annealing": [
    {
      name: "initial_temperature",
      label: "Initial Temperature",
      defaultValue: 1000,
      min: 100,
      max: 5000,
      step: 100,
      tooltip: "Higher temperature allows for more exploration initially"
    },
    {
      name: "cooling_rate",
      label: "Cooling Rate",
      defaultValue: 0.99,
      min: 0.8,
      max: 0.999,
      step: 0.001,
      tooltip: "Rate at which temperature decreases (closer to 1 means slower cooling)"
    },
    {
      name: "max_iterations",
      label: "Maximum Iterations",
      defaultValue: 1000,
      min: 100,
      max: 10000,
      step: 100,
      tooltip: "Maximum number of iterations for the algorithm"
    }
  ],
  "tabu-search": [
    {
      name: "max-iterations",
      label: "Maximum Iterations",
      defaultValue: 1000,
      min: 100,
      max: 10000,
      step: 100,
      tooltip: "Maximum number of iterations for the search process"
    },
    {
      name: "tabu-tenure",
      label: "Tabu Tenure",
      defaultValue: 10,
      min: 1,
      max: 50,
      step: 1,
      tooltip: "Number of iterations a solution remains in the tabu list"
    },
    {
      name: "neighborhood-size",
      label: "Neighborhood Size",
      defaultValue: 10,
      min: 5,
      max: 50,
      step: 5,
      tooltip: "Number of neighbor solutions to evaluate in each iteration"
    }
  ],
  "genetic-algorithm": [
    {
      name: "pop_size",
      label: "Population Size",
      defaultValue: 50,
      min: 10,
      max: 200,
      step: 10,
      tooltip: "Number of solutions in the population"
    },
    {
      name: "num_generations",
      label: "Number of Generations",
      defaultValue: 100,
      min: 10,
      max: 1000,
      step: 10,
      tooltip: "Number of generations to evolve the population"
    },
    {
      name: "mutation_rate",
      label: "Mutation Rate",
      defaultValue: 0.01,
      min: 0.001,
      max: 0.1,
      step: 0.001,
      tooltip: "Probability of mutation occurring for each bit"
    }
  ]
};
