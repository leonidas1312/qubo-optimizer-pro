import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";

interface TransformationStepsProps {
  inputParameters: string | null;
  costFunction: string | null;
  algorithmLogic: string | null;
}

export const TransformationSteps = ({
  inputParameters,
  costFunction,
  algorithmLogic,
}: TransformationStepsProps) => {
  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Info className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-semibold">Code Transformation Steps</h3>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2">1. Input Parameters</h4>
          <div className="flex flex-wrap gap-2">
            {inputParameters ? (
              inputParameters.split(',').map((param, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-blue-500/10"
                >
                  {param.trim()}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                Select the input parameters section in your code
              </p>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">2. Cost Function</h4>
          {costFunction ? (
            <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto">
              {costFunction}
            </pre>
          ) : (
            <p className="text-sm text-muted-foreground">
              Select the cost function section in your code
            </p>
          )}
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">3. Algorithm Logic</h4>
          {algorithmLogic ? (
            <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto">
              {algorithmLogic}
            </pre>
          ) : (
            <p className="text-sm text-muted-foreground">
              Select the core algorithm logic section in your code
            </p>
          )}
        </div>

        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium mb-2">Final Structure</h4>
          <div className="bg-muted p-3 rounded-md text-xs">
            <p>Your code will be transformed into this structure:</p>
            <pre className="mt-2">
{`def solve_qubo(qubo_matrix: np.ndarray, constant: float = 0.0, parameters: dict = None):
    # Input parameters
    if parameters is None:
        parameters = {}
    
    # Cost function
    def calculate_cost(solution):
        ...
    
    # Algorithm logic
    def optimize():
        ...
    
    return best_solution, best_cost, iterations_cost, time_taken`}
            </pre>
          </div>
        </div>
      </div>
    </Card>
  );
};