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
      name: "temperature",
      label: "Initial Temperature",
      defaultValue: 100,
      min: 1,
      max: 1000,
      step: 1,
      tooltip: "Higher temperature allows for more exploration initially"
    },
    {
      name: "cooling-rate",
      label: "Cooling Rate",
      defaultValue: 0.95,
      min: 0.1,
      max: 0.99,
      step: 0.01,
      tooltip: "Rate at which temperature decreases"
    }
  ],
  "quantum-inspired": [
    {
      name: "population-size",
      label: "Population Size",
      defaultValue: 50,
      min: 10,
      max: 200,
      step: 10,
      tooltip: "Number of solutions in the population"
    },
    {
      name: "mutation-rate",
      label: "Mutation Rate",
      defaultValue: 0.1,
      min: 0.01,
      max: 0.5,
      step: 0.01,
      tooltip: "Probability of mutation occurring"
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
      name: "population-size",
      label: "Population Size",
      defaultValue: 100,
      min: 10,
      max: 500,
      step: 10,
      tooltip: "Number of individuals in the population"
    },
    {
      name: "mutation-rate",
      label: "Mutation Rate",
      defaultValue: 0.01,
      min: 0.001,
      max: 0.1,
      step: 0.001,
      tooltip: "Probability of gene mutation"
    },
    {
      name: "crossover-rate",
      label: "Crossover Rate",
      defaultValue: 0.8,
      min: 0.1,
      max: 1.0,
      step: 0.1,
      tooltip: "Probability of crossover between parents"
    }
  ]
};