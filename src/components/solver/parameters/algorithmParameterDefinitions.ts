export const parameters = {
  "simulated-annealing": [
    {
      name: "initial_temperature",
      label: "Initial Temperature",
      tooltip: "Starting temperature for the annealing process",
      defaultValue: 1000,
      min: 100,
      max: 5000,
      step: 100
    },
    {
      name: "cooling_rate",
      label: "Cooling Rate",
      tooltip: "Rate at which temperature decreases",
      defaultValue: 0.99,
      min: 0.8,
      max: 0.999,
      step: 0.001
    },
    {
      name: "max_iterations",
      label: "Maximum Iterations",
      tooltip: "Maximum number of iterations",
      defaultValue: 1000,
      min: 100,
      max: 10000,
      step: 100
    }
  ],
  "quantum-inspired": [
    {
      name: "num_layers",
      label: "Number of Layers",
      tooltip: "Number of layers in the quantum circuit",
      defaultValue: 2,
      min: 1,
      max: 10,
      step: 1
    },
    {
      name: "max_iters",
      label: "Maximum Iterations",
      tooltip: "Maximum number of optimization iterations",
      defaultValue: 10,
      min: 1,
      max: 100,
      step: 1
    },
    {
      name: "nbitstrings",
      label: "Number of Bitstrings",
      tooltip: "Number of bitstrings to sample",
      defaultValue: 5,
      min: 1,
      max: 20,
      step: 1
    },
    {
      name: "opt_time",
      label: "Optimization Time",
      tooltip: "Time allocated for optimization (seconds)",
      defaultValue: 1.0,
      min: 0.1,
      max: 10.0,
      step: 0.1
    },
    {
      name: "rl_time",
      label: "RL Search Time",
      tooltip: "Time allocated for reinforcement learning search (seconds)",
      defaultValue: 1.0,
      min: 0.1,
      max: 10.0,
      step: 0.1
    },
    {
      name: "initial_temperature",
      label: "Initial Temperature",
      tooltip: "Starting temperature for the RL search",
      defaultValue: 10.0,
      min: 1.0,
      max: 100.0,
      step: 1.0
    }
  ],
  "genetic-algorithm": [
    {
      name: "pop_size",
      label: "Population Size",
      tooltip: "Size of the population",
      defaultValue: 50,
      min: 10,
      max: 200,
      step: 10
    },
    {
      name: "num_generations",
      label: "Number of Generations",
      tooltip: "Number of generations to evolve",
      defaultValue: 100,
      min: 10,
      max: 1000,
      step: 10
    },
    {
      name: "mutation_rate",
      label: "Mutation Rate",
      tooltip: "Probability of mutation",
      defaultValue: 0.01,
      min: 0.001,
      max: 0.1,
      step: 0.001
    }
  ]
};