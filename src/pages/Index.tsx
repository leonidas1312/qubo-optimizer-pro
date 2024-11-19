import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MatrixUpload } from "@/components/upload/MatrixUpload";
import { SolverConfig } from "@/components/solver/SolverConfig";
import { ResultsChart } from "@/components/visualization/ResultsChart";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const Index = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null);

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto">
        <section className="text-center mb-16 animate-fade-in-slow">
          <h1 className="text-5xl font-bold mb-4 gradient-text">
            Quantum-Inspired Optimization
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Upload your QUBO matrices and solve complex optimization problems using quantum-inspired algorithms.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline">View Examples</Button>
          </div>
        </section>

        <div className="grid gap-8 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <MatrixUpload />
              <SolverConfig />
            </div>
            <ResultsChart />
          </div>

          {selectedAlgorithm && (
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Algorithm Parameters</h2>
              {selectedAlgorithm === "simulated-annealing" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Simulated Annealing Parameters</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Initial Temperature</Label>
                      <Input type="number" placeholder="1.0" />
                    </div>
                    <div className="space-y-2">
                      <Label>Cooling Rate</Label>
                      <Input type="number" placeholder="0.95" />
                    </div>
                    <div className="space-y-2">
                      <Label>Iterations</Label>
                      <Input type="number" placeholder="1000" />
                    </div>
                    <div className="space-y-2">
                      <Label>Min Temperature</Label>
                      <Input type="number" placeholder="0.01" />
                    </div>
                  </div>
                </div>
              )}
              {selectedAlgorithm === "quantum-inspired" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Quantum-Inspired Parameters</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Population Size</Label>
                      <Input type="number" placeholder="100" />
                    </div>
                    <div className="space-y-2">
                      <Label>Mutation Rate</Label>
                      <Slider defaultValue={[0.1]} max={1} step={0.01} />
                    </div>
                    <div className="space-y-2">
                      <Label>Crossover Rate</Label>
                      <Slider defaultValue={[0.8]} max={1} step={0.01} />
                    </div>
                    <div className="space-y-2">
                      <Label>Generations</Label>
                      <Input type="number" placeholder="50" />
                    </div>
                  </div>
                </div>
              )}
              {selectedAlgorithm === "tabu-search" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Tabu Search Parameters</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Tabu List Size</Label>
                      <Input type="number" placeholder="10" />
                    </div>
                    <div className="space-y-2">
                      <Label>Max Iterations</Label>
                      <Input type="number" placeholder="1000" />
                    </div>
                    <div className="space-y-2">
                      <Label>Aspiration Value</Label>
                      <Input type="number" placeholder="100" />
                    </div>
                    <div className="space-y-2">
                      <Label>Neighborhood Size</Label>
                      <Input type="number" placeholder="20" />
                    </div>
                  </div>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;