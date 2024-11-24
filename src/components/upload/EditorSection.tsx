import { CodeEditor } from "@/components/playground/editor/CodeEditor";
import { Button } from "@/components/ui/button";
import { Selection } from "@/types/qubot";

interface EditorSectionProps {
  code: string;
  setCode: (code: string) => void;
  setInputParameters: (selection: Selection | null) => void;
  setCostFunction: (selection: Selection | null) => void;
  setAlgorithmLogic: (selection: Selection | null) => void;
  handleCreateSolver: () => void;
  name: string;
  inputParameters: Selection | null;
  costFunction: Selection | null;
  algorithmLogic: Selection | null;
}

export const EditorSection = ({
  code,
  setCode,
  setInputParameters,
  setCostFunction,
  setAlgorithmLogic,
  handleCreateSolver,
  name,
  inputParameters,
  costFunction,
  algorithmLogic,
}: EditorSectionProps) => {
  return (
    <div className="h-full p-4 space-y-4">
      {code ? (
        <CodeEditor
          value={code}
          onChange={setCode}
          className="h-[500px]"
          language="python"
          onSelectInputParameters={setInputParameters}
          onSelectCostFunction={setCostFunction}
          onSelectAlgorithmLogic={setAlgorithmLogic}
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">
            Select a Python file from the repository to create your solver.
          </p>
        </div>
      )}

      <Button
        className="w-full"
        size="lg"
        onClick={handleCreateSolver}
        disabled={!name || !inputParameters || !costFunction || !algorithmLogic}
      >
        Create QUBOt Solver
      </Button>
    </div>
  );
};