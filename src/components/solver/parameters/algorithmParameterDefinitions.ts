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
  "quantum-inspired": [
    {
      name: "num_layers",
      label: "Number of Layers",
      defaultValue: 2,
      min: 1,
      max: 10,
      step: 1,
      tooltip: "Number of layers for the quantum circuit"
    },
    {
      name: "max_iters",
      label: "Maximum Iterations",
      defaultValue: 100,
      min: 10,
      max: 1000,
      step: 10,
      tooltip: "Maximum number of optimizer+RL search iterations"
    },
    {
      name: "nbitstrings",
      label: "Number of Bitstrings",
      defaultValue: 5,
      min: 1,
      max: 20,
      step: 1,
      tooltip: "Number of samples to draw from the quantum circuit"
    },
    {
      name: "opt_time",
      label: "Optimizer Time (s)",
      defaultValue: 10,
      min: 1,
      max: 100,
      step: 1,
      tooltip: "Optimizer time to run in seconds"
    },
    {
      name: "rl_time",
      label: "RL Search Time (s)", 
      defaultValue: 10,
      min: 1,
      max: 100,
      step: 1,
      tooltip: "RL algorithm time to run in seconds"
    },
    {
      name: "initial_temperature",
      label: "Initial Temperature",
      defaultValue: 10,
      min: 0.1,
      max: 100,
      step: 0.1,
      tooltip: "Starting temperature for the RL search"
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
