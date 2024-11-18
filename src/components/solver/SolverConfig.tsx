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

export const SolverConfig = () => {
  const [solver, setSolver] = useState("quantum");
  const [iterations, setIterations] = useState([100]);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Solver Configuration</h3>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Solver Type</Label>
          <Select value={solver} onValueChange={setSolver}>
            <SelectTrigger>
              <SelectValue placeholder="Select solver type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quantum">Quantum</SelectItem>
              <SelectItem value="quantum-inspired">Quantum Inspired</SelectItem>
              <SelectItem value="classical">Classical</SelectItem>
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
          />
          <span className="text-sm text-muted-foreground">
            {iterations[0]} iterations
          </span>
        </div>

        <Button className="w-full">Run Solver</Button>
      </div>
    </Card>
  );
};