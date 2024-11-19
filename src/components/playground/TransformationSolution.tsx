import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { HelpTooltip } from "./help/HelpTooltip";
import { HelpModal } from "./help/HelpModal";
import { CodeEditor } from "./editor/CodeEditor";
import { cn } from "@/lib/utils";

export const TransformationSolution = () => {
  const [penaltyParameter, setPenaltyParameter] = useState("1.0");
  const [quboMatrix, setQuboMatrix] = useState("");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("simulated-annealing");
  const [iterations, setIterations] = useState("1000");
  const [temperature, setTemperature] = useState("0.1");
  const [solution, setSolution] = useState("");
  const [hasError, setHasError] = useState(false);
  const { toast } = useToast();

  const handleTransformToQUBO = () => {
    try {
      setHasError(false);
      toast({
        title: "Transforming to QUBO",
        description: "This feature is not yet implemented.",
      });
    } catch (error) {
      setHasError(true);
      toast({
        title: "Error",
        description: "Failed to transform to QUBO format",
        variant: "destructive",
      });
    }
  };

  const handleSolve = () => {
    try {
      setHasError(false);
      toast({
        title: "Solving QUBO",
        description: "This feature is not yet implemented.",
      });
    } catch (error) {
      setHasError(true);
      toast({
        title: "Error",
        description: "Failed to solve QUBO",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="space-y-6">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Transform & Solve</h2>
        <HelpModal />
      </header>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          Transform to QUBO
          <HelpTooltip content="Convert your optimization problem into QUBO format" />
        </h3>
        <section className="space-y-4">
          <div>
            <Label htmlFor="penalty" className="flex items-center">
              Penalty Parameter
              <HelpTooltip content="Higher values enforce constraints more strictly" />
            </Label>
            <Input
              id="penalty"
              type="number"
              value={penaltyParameter}
              onChange={(e) => setPenaltyParameter(e.target.value)}
              step="0.1"
              min="0"
              className={cn("mt-1", hasError && "border-destructive")}
            />
          </div>
          <Button onClick={handleTransformToQUBO} className="w-full">
            Transform to QUBO
          </Button>
          <div>
            <Label htmlFor="qubo-matrix">QUBO Matrix</Label>
            <CodeEditor
              value={quboMatrix}
              onChange={setQuboMatrix}
              error={hasError}
              className="mt-1"
            />
          </div>
        </section>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          Solve QUBO
          <HelpTooltip content="Configure and run the QUBO solver" />
        </h3>
        <section className="space-y-4">
          <div>
            <Label className="flex items-center">
              Solver Algorithm
              <HelpTooltip content="Choose the algorithm to solve your QUBO problem" />
            </Label>
            <Select
              value={selectedAlgorithm}
              onValueChange={setSelectedAlgorithm}
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select algorithm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simulated-annealing">
                  Simulated Annealing
                </SelectItem>
                <SelectItem value="tabu-search">Tabu Search</SelectItem>
                <SelectItem value="quantum-inspired">
                  Quantum-Inspired
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="iterations" className="flex items-center">
                Iterations
                <HelpTooltip content="Number of iterations to run the solver" />
              </Label>
              <Input
                id="iterations"
                type="number"
                value={iterations}
                onChange={(e) => setIterations(e.target.value)}
                min="100"
                step="100"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="temperature" className="flex items-center">
                Temperature
                <HelpTooltip content="Controls the exploration vs exploitation trade-off" />
              </Label>
              <Input
                id="temperature"
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                step="0.1"
                min="0.1"
                className="mt-1"
              />
            </div>
          </div>

          <Button onClick={handleSolve} className="w-full">
            Solve
          </Button>

          <div>
            <Label htmlFor="solution">Solution</Label>
            <CodeEditor
              value={solution}
              onChange={setSolution}
              error={hasError}
              className="mt-1"
            />
          </div>
        </section>
      </Card>
    </section>
  );
};
