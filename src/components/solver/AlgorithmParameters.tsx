import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface AlgorithmParametersProps {
  solver: string;
  onParameterChange: (param: string, value: number) => void;
}

export const AlgorithmParameters = ({ solver, onParameterChange }: AlgorithmParametersProps) => {
  const parameters = {
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
    "gurobi": [
      {
        name: "time-limit",
        label: "Time Limit (seconds)",
        defaultValue: 60,
        min: 1,
        max: 3600,
        step: 1,
        tooltip: "Maximum solving time in seconds"
      },
      {
        name: "gap-tolerance",
        label: "Gap Tolerance",
        defaultValue: 0.01,
        min: 0.0001,
        max: 0.1,
        step: 0.0001,
        tooltip: "Acceptable gap between best solution and bound"
      }
    ],
    "qbsolv": [
      {
        name: "num-repeats",
        label: "Number of Repeats",
        defaultValue: 50,
        min: 1,
        max: 1000,
        step: 1,
        tooltip: "Number of times to repeat the solving process"
      },
      {
        name: "verbosity",
        label: "Verbosity Level",
        defaultValue: 0,
        min: 0,
        max: 3,
        step: 1,
        tooltip: "Level of detail in solver output"
      }
    ],
    "dwave-sdk": [
      {
        name: "chain-strength",
        label: "Chain Strength",
        defaultValue: 1,
        min: 0.1,
        max: 10,
        step: 0.1,
        tooltip: "Strength of chains between physical qubits"
      },
      {
        name: "num-reads",
        label: "Number of Reads",
        defaultValue: 1000,
        min: 100,
        max: 10000,
        step: 100,
        tooltip: "Number of samples to collect from the QPU"
      }
    ]
  };

  const currentParams = parameters[solver as keyof typeof parameters] || [];
  const [paramValues, setParamValues] = useState<Record<string, number>>({});

  // Initialize parameter values when solver changes
  useEffect(() => {
    const initialValues = currentParams.reduce((acc, param) => ({
      ...acc,
      [param.name]: param.defaultValue
    }), {});
    setParamValues(initialValues);
    // Notify parent of initial values
    Object.entries(initialValues).forEach(([name, value]) => {
      onParameterChange(name, value);
    });
  }, [solver]);

  const handleSliderChange = (name: string, value: number[]) => {
    const newValue = value[0];
    setParamValues(prev => ({ ...prev, [name]: newValue }));
    onParameterChange(name, newValue);
  };

  const handleInputChange = (name: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const param = currentParams.find(p => p.name === name);
      if (param) {
        const clampedValue = Math.min(Math.max(numValue, param.min), param.max);
        setParamValues(prev => ({ ...prev, [name]: clampedValue }));
        onParameterChange(name, clampedValue);
      }
    }
  };

  return (
    <Card className="p-6 mt-4 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/10">
      <div className="space-y-6">
        {currentParams.map((param) => (
          <div key={param.name} className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>{param.label}</Label>
              <TooltipProvider delayDuration={500}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{param.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex gap-4 items-center">
              <Slider
                defaultValue={[param.defaultValue]}
                value={[paramValues[param.name] || param.defaultValue]}
                min={param.min}
                max={param.max}
                step={param.step}
                onValueChange={(value) => handleSliderChange(param.name, value)}
                className="flex-1"
              />
              <Input
                type="number"
                value={paramValues[param.name] || param.defaultValue}
                onChange={(e) => handleInputChange(param.name, e.target.value)}
                className="w-20"
                min={param.min}
                max={param.max}
                step={param.step}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};