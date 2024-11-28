import { Loader2 } from "lucide-react";

interface AssistantStepsProps {
  currentStep: string;
}

export const AssistantSteps = ({ currentStep }: AssistantStepsProps) => {
  return (
    <div className="flex items-center gap-2 p-4 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span>{currentStep}</span>
    </div>
  );
};