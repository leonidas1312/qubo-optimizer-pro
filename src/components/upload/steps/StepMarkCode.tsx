import { Card } from "@/components/ui/card";
import { CodeEditor } from "@/components/playground/editor/CodeEditor";
import { Selection } from "@/types/qubot";
import { Code2, Lightbulb } from "lucide-react";

interface StepMarkCodeProps {
  code: string;
  setCode: (code: string) => void;
  setInputParameters: (selection: Selection | null) => void;
  setCostFunction: (selection: Selection | null) => void;
  setAlgorithmLogic: (selection: Selection | null) => void;
}

export const StepMarkCode = ({
  code,
  setCode,
  setInputParameters,
  setCostFunction,
  setAlgorithmLogic,
}: StepMarkCodeProps) => {
  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-purple-600/10 flex items-center justify-center">
          <Code2 className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Mark Your Code</h2>
          <p className="text-muted-foreground">
            Highlight the important parts of your algorithm
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-4 p-4 bg-amber-500/10 rounded-lg">
          <Lightbulb className="h-6 w-6 text-amber-500 mt-1 flex-shrink-0" />
          <div className="space-y-2">
            <h3 className="font-medium">How to mark your code:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Right-click to select sections of your code</li>
              <li>Mark the input parameters (variables to optimize)</li>
              <li>Highlight the cost function implementation</li>
              <li>Select the core algorithm logic</li>
            </ul>
          </div>
        </div>

        <CodeEditor
          value={code}
          onChange={setCode}
          onSelectInputParameters={setInputParameters}
          onSelectCostFunction={setCostFunction}
          onSelectAlgorithmLogic={setAlgorithmLogic}
          language="python"
          className="h-[500px]"
        />
      </div>
    </Card>
  );
};