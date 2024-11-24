import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Selection } from "@/types/qubot";
import { Eye, ArrowRight } from "lucide-react";

interface StepPreviewProps {
  name: string;
  inputParameters: Selection | null;
  costFunction: Selection | null;
  algorithmLogic: Selection | null;
  onCreateSolver: () => void;
}

export const StepPreview = ({
  name,
  inputParameters,
  costFunction,
  algorithmLogic,
  onCreateSolver,
}: StepPreviewProps) => {
  const isComplete = name && inputParameters && costFunction && algorithmLogic;

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-12 w-12 rounded-full bg-green-600/10 flex items-center justify-center">
          <Eye className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Preview Your QUBOt</h2>
          <p className="text-muted-foreground">
            Review your solver before creating it
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Input Parameters</h3>
            <div className="flex flex-wrap gap-2">
              {inputParameters ? (
                inputParameters.text.split(',').map((param, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="px-3 py-1 bg-blue-500/10"
                  >
                    {param.trim()}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No input parameters selected yet
                </p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Cost Function</h3>
            {costFunction ? (
              <pre className="bg-black/30 p-3 rounded-md text-xs overflow-x-auto">
                {costFunction.text}
              </pre>
            ) : (
              <p className="text-sm text-muted-foreground">
                No cost function selected yet
              </p>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Algorithm Logic</h3>
            {algorithmLogic ? (
              <pre className="bg-black/30 p-3 rounded-md text-xs overflow-x-auto">
                {algorithmLogic.text}
              </pre>
            ) : (
              <p className="text-sm text-muted-foreground">
                No algorithm logic selected yet
              </p>
            )}
          </div>
        </div>

        <Button
          onClick={onCreateSolver}
          disabled={!isComplete}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-800"
        >
          {isComplete ? (
            <>
              Create QUBOt
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            "Complete all steps to create your QUBOt"
          )}
        </Button>
      </div>
    </Card>
  );
};