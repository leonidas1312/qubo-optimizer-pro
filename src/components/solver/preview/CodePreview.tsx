import { CodeEditor } from "@/components/playground/editor/CodeEditor";
import { cn } from "@/lib/utils";

interface CodePreviewProps {
  fileContent: string;
  language?: string;
  className?: string;
}

export const CodePreview = ({ fileContent, language = "python", className }: CodePreviewProps) => {
  return (
    <div className={cn("h-full bg-black/50 backdrop-blur-sm", className)}>
      <div className="p-4 border-b border-white/10">
        <h3 className="text-sm font-medium text-white/80">Code Preview</h3>
      </div>
      <div className="h-[calc(100%-57px)]">
        <CodeEditor
          value={fileContent}
          onChange={() => {}}
          language={language}
          className="h-full border-none"
        />
      </div>
    </div>
  );
};