import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Selection } from "@/types/qubot";
import { toast } from "sonner";

interface CodeSelectionMenuProps {
  children: React.ReactNode;
  onSelectInputParameters: (selection: Selection) => void;
  onSelectCostFunction: (selection: Selection) => void;
  onSelectAlgorithmLogic: (selection: Selection) => void;
}

export const CodeSelectionMenu = ({
  children,
  onSelectInputParameters,
  onSelectCostFunction,
  onSelectAlgorithmLogic,
}: CodeSelectionMenuProps) => {
  const handleSelection = (type: "input" | "cost" | "algorithm") => {
    const selection = window.getSelection();
    if (!selection || !selection.toString()) {
      toast.error("Please select some code first");
      return;
    }

    const selectionObj = {
      start: selection.anchorOffset,
      end: selection.focusOffset,
      text: selection.toString(),
    };

    switch (type) {
      case "input":
        onSelectInputParameters(selectionObj);
        toast.success("Input parameters selected");
        break;
      case "cost":
        onSelectCostFunction(selectionObj);
        toast.success("Cost function selected");
        break;
      case "algorithm":
        onSelectAlgorithmLogic(selectionObj);
        toast.success("Algorithm logic selected");
        break;
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onClick={() => handleSelection("input")}>
          Mark as Input Parameters
        </ContextMenuItem>
        <ContextMenuItem onClick={() => handleSelection("cost")}>
          Mark as Cost Function
        </ContextMenuItem>
        <ContextMenuItem onClick={() => handleSelection("algorithm")}>
          Mark as Algorithm Logic
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};