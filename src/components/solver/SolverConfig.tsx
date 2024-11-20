import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AlgorithmParameters } from "./AlgorithmParameters";
import { toast } from "sonner";
import { ResultsChart } from "../visualization/ResultsChart";

interface SolverConfigProps {
  quboMatrix: number[][] | null;
  constant: number;
}

export const SolverConfig = ({ quboMatrix, constant }: SolverConfigProps) => {
  const [solver, setSolver] = useState("tabu-search");
  const [parameters, setParameters] = useState<Record<string, number>>({});
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ 
    cost: number; 
    time: number;
    iterations_cost?: number[];
  } | null>(null);

  const handleParameterChange = (param: string, value: number) => {
    setParameters((prevParams) => {
      if (prevParams[param] === value) return prevParams;
      return { ...prevParams, [param]: value };
    });
  };

  const handleSolve = async () => {
    if (!quboMatrix) {
      toast.error("Please upload a QUBO matrix first");
      return;
    }

    setIsRunning(true);
    setProgress(0);
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/api/solve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matrix: quboMatrix,
          constant: constant,
          solver: solver,
          parameters: parameters,
        }),
      });

      if (!response.ok) throw new Error('Solver failed');
      
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setResult({
        cost: data.cost,
        time: data.time,
        iterations_cost: data.iterations_cost,
      });
      
      toast.success(`Optimization completed! Best cost: ${data.cost}`);
    } catch (error) {
      toast.error("Failed to run solver");
      console.error(error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Solver Configuration</h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Solver Type</Label>
            <Select value={solver} onValueChange={setSolver}>
              <SelectTrigger className="w-full bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent border-input">
                <SelectValue placeholder="Select solver type" />
              </SelectTrigger>
              <SelectContent className="bg-background border-input">
                <SelectItem value="simulated-annealing">Simulated Annealing</SelectItem>
                <SelectItem value="quantum-inspired">Quantum Inspired</SelectItem>
                <SelectItem value="tabu-search">Tabu Search</SelectItem>
                <SelectItem value="genetic-algorithm">Genetic Algorithm</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <AlgorithmParameters 
            solver={solver} 
            onParameterChange={handleParameterChange}
            currentParameters={parameters}
          />

          {isRunning && (
            <div className="space-y-2">
              <Label>Optimization Progress</Label>
              <Progress value={progress} className="w-full" />
            </div>
          )}

          {result && (
            <div className="space-y-2 p-4 bg-muted rounded-lg">
              <p className="font-medium">Results:</p>
              <p>Best Cost: {result.cost}</p>
              <p>Time: {result.time.toFixed(2)}s</p>
            </div>
          )}

          <Button 
            className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white"
            onClick={handleSolve}
            disabled={isRunning || !quboMatrix}
          >
            {isRunning ? "Running..." : "Run Solver"}
          </Button>
        </div>
      </Card>

      {result?.iterations_cost && (
        <ResultsChart data={result.iterations_cost} />
      )}
    </div>
  );
};