import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Selection } from "@/types/qubot";
import { CodeEditor } from "@/components/playground/editor/CodeEditor";
import { SolverPreview } from "@/components/solver/SolverPreview";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

interface StepTwoProps {
  code: string;
  setCode: (code: string) => void;
  name: string;
  inputParameters: Selection | null;
  costFunction: Selection | null;
  algorithmLogic: Selection | null;
  setInputParameters: (selection: Selection | null) => void;
  setCostFunction: (selection: Selection | null) => void;
  setAlgorithmLogic: (selection: Selection | null) => void;
  onCreateSolver: () => void;
}

export const StepTwo = ({
  code,
  setCode,
  name,
  inputParameters,
  costFunction,
  algorithmLogic,
  setInputParameters,
  setCostFunction,
  setAlgorithmLogic,
  onCreateSolver,
}: StepTwoProps) => {
  const handleMenuAction = (type: "input" | "cost" | "algorithm") => {
    const selection = window.getSelection();
    if (!selection || !selection.toString()) return;

    const selectionObj = {
      start: selection.anchorOffset,
      end: selection.focusOffset,
      text: selection.toString(),
    };

    switch (type) {
      case "input":
        setInputParameters(selectionObj);
        break;
      case "cost":
        setCostFunction(selectionObj);
        break;
      case "algorithm":
        setAlgorithmLogic(selectionObj);
        break;
    }
  };

  return (
    <Card className="p-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Code Editor</h3>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>Mark Selection As</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={() => handleMenuAction("input")}>
                    Input Parameters
                  </MenubarItem>
                  <MenubarItem onClick={() => handleMenuAction("cost")}>
                    Cost Function
                  </MenubarItem>
                  <MenubarItem onClick={() => handleMenuAction("algorithm")}>
                    Algorithm Logic
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
          <CodeEditor
            value={code}
            onChange={setCode}
            className="h-[500px]"
            language="python"
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Preview</h3>
            <Button
              onClick={onCreateSolver}
              disabled={!name || !inputParameters || !costFunction || !algorithmLogic}
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white"
            >
              Create QUBOt
            </Button>
          </div>
          <Card className="p-4 bg-black/50 backdrop-blur-sm border-white/10">
            <SolverPreview
              name={name}
              inputParameters={inputParameters}
              costFunction={costFunction}
              algorithmLogic={algorithmLogic}
            />
          </Card>
        </div>
      </div>
    </Card>
  );
};