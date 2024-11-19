import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MatrixUpload } from "@/components/upload/MatrixUpload";
import { SolverConfig } from "@/components/solver/SolverConfig";
import { ResultsChart } from "@/components/visualization/ResultsChart";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card } from "@/components/ui/card";

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
                  {/* Add simulated annealing specific controls */}
                </div>
              )}
              {selectedAlgorithm === "quantum-inspired" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Quantum-Inspired Parameters</h3>
                  {/* Add quantum-inspired specific controls */}
                </div>
              )}
              {selectedAlgorithm === "tabu-search" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Tabu Search Parameters</h3>
                  {/* Add tabu search specific controls */}
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