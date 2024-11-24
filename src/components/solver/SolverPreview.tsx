import { UserRound } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Selection } from "@/types/qubot";

interface SolverPreviewProps {
  name: string;
  inputParameters: Selection | null;
  costFunction: Selection | null;
  algorithmLogic: Selection | null;
}

export const SolverPreview = ({
  name,
  inputParameters,
  costFunction,
  algorithmLogic,
}: SolverPreviewProps) => {
  return (
    <Card className="p-4 bg-black/50 backdrop-blur-sm border-white/10">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <UserRound className="h-6 w-6 text-white" />
        </div>
        <h3 className="font-semibold">{name || "Unnamed Solver"}</h3>
      </div>
      
      <ScrollArea className="h-[300px]">
        <div className="space-y-4">
          {inputParameters && (
            <div>
              <h4 className="text-sm font-medium mb-2">Input Parameters</h4>
              <pre className="bg-black/30 p-2 rounded text-xs">{inputParameters.text}</pre>
            </div>
          )}
          
          {costFunction && (
            <div>
              <h4 className="text-sm font-medium mb-2">Cost Function</h4>
              <pre className="bg-black/30 p-2 rounded text-xs">{costFunction.text}</pre>
            </div>
          )}
          
          {algorithmLogic && (
            <div>
              <h4 className="text-sm font-medium mb-2">Algorithm Logic</h4>
              <pre className="bg-black/30 p-2 rounded text-xs">{algorithmLogic.text}</pre>
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};