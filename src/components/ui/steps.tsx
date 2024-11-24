import { cn } from "@/lib/utils";

interface StepsProps {
  steps: {
    title: string;
    description?: string;
  }[];
  currentStep: number;
  className?: string;
}

export function Steps({ steps, currentStep, className }: StepsProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {steps.map((step, index) => (
        <div
          key={step.title}
          className={cn(
            "flex gap-4 items-start",
            index < currentStep && "text-muted-foreground"
          )}
        >
          <div
            className={cn(
              "h-8 w-8 rounded-full border-2 flex items-center justify-center",
              index < currentStep
                ? "border-primary bg-primary text-primary-foreground"
                : index === currentStep
                ? "border-primary"
                : "border-muted"
            )}
          >
            <span className="text-sm font-medium">{index + 1}</span>
          </div>
          <div className="space-y-1.5">
            <h3 className="font-medium leading-none">{step.title}</h3>
            {step.description && (
              <p className="text-sm text-muted-foreground">{step.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}