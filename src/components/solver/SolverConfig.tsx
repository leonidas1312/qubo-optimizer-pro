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
import { Label } from "@/components/ui/label";
import { AlgorithmParameters } from "./AlgorithmParameters";
import { useToast } from "@/hooks/use-toast";

export const SolverConfig = () => {
  const [solver, setSolver] = useState("simulated-annealing");
  const [parameters, setParameters] = useState<Record<string, number>>({});
  const { toast } = useToast();

  const handleParameterChange = (param: string, value: number) => {
    setParameters((prev) => ({ ...prev, [param]: value }));
  };

  const handleRunSolver = () => {
    toast({
      title: "Solver Started",
      description: `Running ${solver} with custom parameters`,
    });
    console.log("Running solver with parameters:", parameters);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Solver Configuration</h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Solver Type</Label>
            <Select value={solver} onValueChange={setSolver}>
              <SelectTrigger className="w-full bg-card border-muted">
                <SelectValue placeholder="Select solver type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simulated-annealing">Simulated Annealing</SelectItem>
                <SelectItem value="quantum-inspired">Quantum Inspired</SelectItem>
                <SelectItem value="gurobi">Gurobi</SelectItem>
                <SelectItem value="qbsolv">QBSolv</SelectItem>
                <SelectItem value="dwave-sdk">D-Wave SDK</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <AlgorithmParameters 
            solver={solver} 
            onParameterChange={handleParameterChange}
          />

          <Button 
            className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white" 
            onClick={handleRunSolver}
          >
            Run Solver
          </Button>
        </div>
      </Card>
    </div>
  );
};