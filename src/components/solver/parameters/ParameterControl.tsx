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

interface ParameterControlProps {
  label: string;
  tooltip: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

export const ParameterControl = ({
  label,
  tooltip,
  value,
  min,
  max,
  step,
  onChange,
}: ParameterControlProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label>{label}</Label>
        <TooltipProvider delayDuration={500}>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex gap-4 items-center">
        <Slider
          value={[value]}
          min={min}
          max={max}
          step={step}
          onValueChange={(values) => onChange(values[0])}
          className="flex-1"
        />
        <Input
          type="number"
          value={value}
          onChange={(e) => {
            const numValue = parseFloat(e.target.value);
            if (!isNaN(numValue)) {
              const clampedValue = Math.min(Math.max(numValue, min), max);
              onChange(clampedValue);
            }
          }}
          className="w-20"
          min={min}
          max={max}
          step={step}
        />
      </div>
    </div>
  );
};