import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import { parameters } from "./parameters/algorithmParameterDefinitions";
import { ParameterControl } from "./parameters/ParameterControl";

interface AlgorithmParametersProps {
  solver: string;
  onParameterChange: (param: string, value: number) => void;
  currentParameters: Record<string, number>;
}

export const AlgorithmParameters = ({ 
  solver, 
  onParameterChange,
  currentParameters 
}: AlgorithmParametersProps) => {
  const currentParams = parameters[solver as keyof typeof parameters] || [];

  useEffect(() => {
    // Initialize parameters when solver changes
    currentParams.forEach(param => {
      if (currentParameters[param.name] === undefined) {
        onParameterChange(param.name, param.defaultValue);
      }
    });
  }, [solver, onParameterChange]);

  return (
    <Card className="p-6 mt-4 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/10">
      <div className="space-y-6">
        {currentParams.map((param) => (
          <ParameterControl
            key={param.name}
            label={param.label}
            tooltip={param.tooltip}
            value={currentParameters[param.name] ?? param.defaultValue}
            min={param.min}
            max={param.max}
            step={param.step}
            onChange={(value) => onParameterChange(param.name, value)}
          />
        ))}
      </div>
    </Card>
  );
};