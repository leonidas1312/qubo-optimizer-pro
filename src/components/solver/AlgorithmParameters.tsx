import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { parameters } from "./parameters/algorithmParameterDefinitions";
import { ParameterControl } from "./parameters/ParameterControl";

interface AlgorithmParametersProps {
  solver: string;
  onParameterChange: (param: string, value: number) => void;
}

export const AlgorithmParameters = ({ solver, onParameterChange }: AlgorithmParametersProps) => {
  const [paramValues, setParamValues] = useState<Record<string, number>>({});
  const currentParams = parameters[solver as keyof typeof parameters] || [];

  useEffect(() => {
    const initialValues = currentParams.reduce((acc, param) => ({
      ...acc,
      [param.name]: param.defaultValue
    }), {} as Record<string, number>);
    setParamValues(initialValues);
    Object.entries(initialValues).forEach(([name, value]) => {
      onParameterChange(name, value);
    });
  }, [solver, onParameterChange]);

  const handleParameterChange = (name: string, value: number) => {
    setParamValues(prev => ({ ...prev, [name]: value }));
    onParameterChange(name, value);
  };

  return (
    <Card className="p-6 mt-4 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/10">
      <div className="space-y-6">
        {currentParams.map((param) => (
          <ParameterControl
            key={param.name}
            label={param.label}
            tooltip={param.tooltip}
            value={paramValues[param.name] || param.defaultValue}
            min={param.min}
            max={param.max}
            step={param.step}
            onChange={(value) => handleParameterChange(param.name, value)}
          />
        ))}
      </div>
    </Card>
  );
};