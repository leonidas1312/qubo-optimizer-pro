export interface ProblemTemplate {
  id: string;
  name: string;
  description: string;
  variables: Array<{
    name: string;
    type: "binary" | "integer" | "continuous";
    lowerBound?: number;
    upperBound?: number;
  }>;
  constraints: string[];
  objective: string;
}

export const templates: ProblemTemplate[] = [
  {
    id: "knapsack",
    name: "Knapsack Problem",
    description: "Classic 0-1 knapsack optimization problem",
    variables: [
      { name: "x1", type: "binary" },
      { name: "x2", type: "binary" },
      { name: "x3", type: "binary" },
    ],
    constraints: ["2x1 + 3x2 + 4x3 <= 10"],
    objective: "maximize: 3x1 + 4x2 + 5x3",
  },
  {
    id: "max-cut",
    name: "Max-Cut Problem",
    description: "Graph partitioning optimization",
    variables: [
      { name: "y1", type: "binary" },
      { name: "y2", type: "binary" },
      { name: "y3", type: "binary" },
    ],
    constraints: ["y1 + y2 + y3 >= 1"],
    objective: "maximize: y1*y2 + y2*y3 + y1*y3",
  },
];