import { cn } from "@/lib/utils";

interface StepsProps {
  steps: {
    title: string;
    description?: string;
  }[];
  currentStep: number;
  className?: string;
  value?: string;
  children?: React.ReactNode;
}

interface StepsTriggerProps {
  value: string;
  className?: string;
  children?: React.ReactNode;
}

interface StepsContentProps {
  value: string;
  className?: string;
  children?: React.ReactNode;
}

export function Steps({ steps, currentStep, className, children }: StepsProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {children}
    </div>
  );
}

export function StepsTrigger({ value, className, children }: StepsTriggerProps) {
  return (
    <div className={cn("cursor-pointer", className)}>
      {children}
    </div>
  );
}

export function StepsContent({ value, className, children }: StepsContentProps) {
  return (
    <div className={cn("mt-4", className)}>
      {children}
    </div>
  );
}