import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-semibold">
          2
        </div>
        <h2 className="text-xl font-semibold">Code Editor & Preview</h2>
      </div>
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
          <Card className="p-4 space-y-4 bg-black/50 backdrop-blur-sm border-white/10">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Input Parameters</h4>
              <div className="flex flex-wrap gap-2">
                {inputParameters ? (
                  inputParameters.text.split(',').map((param, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="px-3 py-1 bg-blue-500/10 hover:bg-blue-500/20 cursor-pointer"
                    >
                      {param.trim()}
                    </Badge>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground">
                    No parameters selected. Mark a section in the code as input parameters.
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Cost Function</h4>
              {costFunction ? (
                <div className="bg-black/30 p-3 rounded-md">
                  <pre className="text-xs whitespace-pre-wrap">{costFunction.text}</pre>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  No cost function selected. Mark a section in the code as cost function.
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Algorithm Logic</h4>
              {algorithmLogic ? (
                <div className="bg-black/30 p-3 rounded-md">
                  <pre className="text-xs whitespace-pre-wrap">{algorithmLogic.text}</pre>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  No algorithm logic selected. Mark a section in the code as algorithm logic.
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
};