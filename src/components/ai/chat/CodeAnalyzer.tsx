import { Loader2, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CodeEditor } from "@/components/playground/editor/CodeEditor";
import { ChevronsUpDown } from "lucide-react";

interface CodeAnalyzerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  analyzingFile: string | null;
  selectedFile: string | null;
  fileContent: string;
}

export const CodeAnalyzer = ({
  isOpen,
  onOpenChange,
  analyzingFile,
  selectedFile,
  fileContent,
}: CodeAnalyzerProps) => {
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={onOpenChange}
      className="w-full space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 p-2 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2">
          {analyzingFile ? (
            <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
          ) : (
            <Code className="h-5 w-5 text-blue-500" />
          )}
          <h4 className="text-sm font-semibold">Code Analyzer (LLM A)</h4>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 text-sm space-y-2">
          {analyzingFile ? (
            <p className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing file: {analyzingFile}
            </p>
          ) : selectedFile ? (
            <CodeEditor
              value={fileContent}
              onChange={() => {}}
              language="javascript"
              className="h-[200px] border-none"
            />
          ) : (
            <>
              <p>Analyzing code structure and dependencies...</p>
              <p>Identifying key components and interactions...</p>
              <p>Generating code insights for modification...</p>
            </>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};