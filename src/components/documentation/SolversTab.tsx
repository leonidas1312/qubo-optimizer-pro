import { Card } from "@/components/ui/card";
import { Activity, Cpu, Code2, Database } from "lucide-react";

export const SolversTab = () => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Available Solvers</h2>
      <div className="grid gap-6">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Activity className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Simulated Annealing</h3>
              <p className="text-muted-foreground">
                A probabilistic technique that simulates the physical process of annealing for approximating the global optimum.
              </p>
              <div className="mt-2 text-sm text-muted-foreground">
                <strong>Key Parameters:</strong>
                <ul className="list-disc list-inside mt-1">
                  <li>Initial Temperature: Controls initial exploration (default: 1000)</li>
                  <li>Cooling Rate: Affects convergence speed (default: 0.99)</li>
                  <li>Max Iterations: Maximum optimization steps (default: 1000)</li>
                </ul>
              </div>
            </div>
          </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-purple-500/10">
                        <Cpu className="h-6 w-6 text-purple-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Quantum-Inspired Algorithm</h3>
                        <p className="text-muted-foreground">
                          A hybrid quantum-classical algorithm that combines quantum circuit simulation with reinforcement learning.
                        </p>
                        <div className="mt-2 text-sm text-muted-foreground">
                          <strong>Key Parameters:</strong>
                          <ul className="list-disc list-inside mt-1">
                            <li>Number of Layers: Quantum circuit depth (default: 2)</li>
                            <li>Max Iterations: Optimization cycles (default: 100)</li>
                            <li>Number of Samples: Bitstrings to evaluate (default: 5)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-green-500/10">
                        <Code2 className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Tabu Search</h3>
                        <p className="text-muted-foreground">
                          A metaheuristic search method that maintains a memory of recent solutions to avoid revisiting them.
                        </p>
                        <div className="mt-2 text-sm text-muted-foreground">
                          <strong>Key Parameters:</strong>
                          <ul className="list-disc list-inside mt-1">
                            <li>Tabu Tenure: Memory length (default: 10)</li>
                            <li>Max Iterations: Search iterations (default: 1000)</li>
                            <li>Neighborhood Size: Solutions to evaluate (default: 10)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-yellow-500/10">
                        <Database className="h-6 w-6 text-yellow-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Genetic Algorithm</h3>
                        <p className="text-muted-foreground">
                          An evolutionary algorithm that mimics natural selection to evolve better solutions over generations.
                        </p>
                        <div className="mt-2 text-sm text-muted-foreground">
                          <strong>Key Parameters:</strong>
                          <ul className="list-disc list-inside mt-1">
                            <li>Population Size: Number of solutions (default: 50)</li>
                            <li>Mutation Rate: Variation probability (default: 0.01)</li>
                            <li>Number of Generations: Evolution cycles (default: 100)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
        </div>
      </div>
    </Card>
  );
};
