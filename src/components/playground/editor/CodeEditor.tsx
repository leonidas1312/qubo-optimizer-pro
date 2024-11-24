import { Editor } from "@monaco-editor/react";
import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { toast } from "sonner";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  className?: string;
  language?: string;
  onSelectInputParameters?: (selection: { start: number; end: number; text: string }) => void;
  onSelectCostFunction?: (selection: { start: number; end: number; text: string }) => void;
  onSelectAlgorithmLogic?: (selection: { start: number; end: number; text: string }) => void;
}

export const CodeEditor = ({ 
  value, 
  onChange, 
  error, 
  className,
  language = "javascript",
  onSelectInputParameters,
  onSelectCostFunction,
  onSelectAlgorithmLogic
}: CodeEditorProps) => {
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
        onSelectInputParameters?.(selectionObj);
        toast.success("Input parameters selected");
        break;
      case "cost":
        onSelectCostFunction?.(selectionObj);
        toast.success("Cost function selected");
        break;
      case "algorithm":
        onSelectAlgorithmLogic?.(selectionObj);
        toast.success("Algorithm logic selected");
        break;
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger className={cn(
        "border rounded-lg overflow-hidden bg-background h-[500px]",
        error && "border-destructive",
        className
      )}>
        <Editor
          height="100%"
          defaultLanguage={language}
          value={value}
          onChange={(value) => onChange(value || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineHeight: 21,
            padding: { top: 16, bottom: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            formatOnPaste: true,
            formatOnType: true,
            renderLineHighlight: "all",
            fontFamily: "'JetBrains Mono', monospace",
            fontLigatures: true,
            renderWhitespace: "selection",
            bracketPairColorization: {
              enabled: true
            },
            guides: {
              bracketPairs: true,
              indentation: true
            },
            contextmenu: false
          }}
        />
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