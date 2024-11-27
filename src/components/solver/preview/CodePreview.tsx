import { CodeEditor } from "@/components/playground/editor/CodeEditor";

interface CodePreviewProps {
  fileContent: string;
  language?: string;
}

export const CodePreview = ({ fileContent, language = "python" }: CodePreviewProps) => {
  return (
    <div className="w-80 h-full border-l border-white/10 bg-black/50">
      <div className="p-4 border-b border-white/10">
        <h3 className="text-sm font-medium text-white/80">Code Preview</h3>
      </div>
      <div className="p-4">
        <CodeEditor
          value={fileContent}
          onChange={() => {}}
          language={language}
          className="h-[calc(100vh-180px)]"
        />
      </div>
    </div>
  );
};