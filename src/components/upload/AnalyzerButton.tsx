import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AnalyzerButtonProps {
  isAnalyzing: boolean;
  disabled: boolean;
  onClick: () => void;
  progress: number;
}

export const AnalyzerButton = ({ 
  isAnalyzing, 
  disabled, 
  onClick,
  progress 
}: AnalyzerButtonProps) => {
  return (
    <div className="space-y-4">
      <Button 
        onClick={onClick} 
        disabled={disabled}
        className="w-full"
      >
        {isAnalyzing ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Analyzing...
          </div>
        ) : (
          "Analyze & Transform"
        )}
      </Button>

      {isAnalyzing && (
        <Progress value={progress} className="w-full" />
      )}
    </div>
  );
};