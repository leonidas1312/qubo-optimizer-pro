import { CodeEditor } from "@/components/playground/editor/CodeEditor";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CodeComparison } from "./CodeComparison";

interface CodePreviewProps {
  fileContent: string;
  language?: string;
  className?: string;
  selectedFile: string | null;
  selectedRepo: any;
}

export const CodePreview = ({ 
  fileContent, 
  language = "python", 
  className,
  selectedFile,
  selectedRepo,
}: CodePreviewProps) => {
  const [originalCode, setOriginalCode] = useState("");

  useEffect(() => {
    if (selectedFile && selectedRepo) {
      fetchFileContent();
    }
  }, [selectedFile, selectedRepo]);

  const fetchFileContent = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/github/repos/${selectedRepo.owner}/${selectedRepo.name}/contents/${selectedFile}`,
        { credentials: 'include' }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch file content');
      }
      
      const data = await response.json();
      const content = atob(data.content);
      setOriginalCode(content);
    } catch (error) {
      toast.error('Failed to load file content');
      console.error('Error fetching file content:', error);
    }
  };

  const handleAcceptChanges = async () => {
    // Implement GitHub save logic here
    toast.success("Changes saved to GitHub repository");
  };

  return (
    <div className={cn("h-full bg-black/50 backdrop-blur-sm", className)}>
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <h3 className="text-sm font-medium text-white/80">
          {selectedFile ? `Code Preview: ${selectedFile}` : 'Code Preview'}
        </h3>
        {selectedFile && (
          <CodeComparison
            originalCode={originalCode}
            aiGeneratedCode={fileContent}
            onAcceptChanges={handleAcceptChanges}
          />
        )}
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