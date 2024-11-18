import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { SolverInfo } from "./SolverInfo";

export const SolverConfig = () => {
  const [solver, setSolver] = useState("simulated-annealing");
  const [iterations, setIterations] = useState([100]);

  return (
    <div className="space-y-6">
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

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Solver Configuration</h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Solver Type</Label>
            <Select value={solver} onValueChange={setSolver}>
              <SelectTrigger className="w-full bg-background border-muted">
                <SelectValue placeholder="Select solver type" />
              </SelectTrigger>
              <SelectContent className="bg-card border-muted">
                <SelectItem value="simulated-annealing" className="hover:bg-muted">Simulated Annealing</SelectItem>
                <SelectItem value="quantum-inspired" className="hover:bg-muted">Quantum Inspired</SelectItem>
                <SelectItem value="gurobi" className="hover:bg-muted">Gurobi</SelectItem>
                <SelectItem value="qbsolv" className="hover:bg-muted">QBSolv</SelectItem>
                <SelectItem value="dwave-sdk" className="hover:bg-muted">D-Wave SDK</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Number of Iterations</Label>
            <Slider
              value={iterations}
              onValueChange={setIterations}
              min={10}
              max={1000}
              step={10}
              className="my-4"
            />
            <span className="text-sm text-muted-foreground">
              {iterations[0]} iterations
            </span>
          </div>

          <Button className="w-full">Run Solver</Button>
        </div>
      </Card>

      <SolverInfo selectedSolver={solver} />
    </div>
  );
};