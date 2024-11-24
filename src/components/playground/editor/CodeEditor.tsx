import { Editor } from "@monaco-editor/react";
import { cn } from "@/lib/utils";
import { CodeSelectionMenu } from "@/components/solver/CodeSelectionMenu";

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
  return (
    <div className={cn(
      "border rounded-lg overflow-hidden bg-background",
      error && "border-destructive",
      className
    )}>
      <CodeSelectionMenu
        onSelectInputParameters={onSelectInputParameters || (() => {})}
        onSelectCostFunction={onSelectCostFunction || (() => {})}
        onSelectAlgorithmLogic={onSelectAlgorithmLogic || (() => {})}
      >
        <Editor
          height="100%"
          defaultLanguage={language}
          value={value}
          onChange={(value) => onChange(value || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: true },
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
            contextmenu: false // Disable default context menu
          }}
          className="min-h-[300px]"
        />
      </CodeSelectionMenu>
    </div>
  );
};