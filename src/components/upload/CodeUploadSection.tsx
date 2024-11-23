import { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";

interface CodeUploadSectionProps {
  code: string;
  fileName: string | null;
  onCodeChange: (value: string) => void;
}

export const CodeUploadSection = ({
  code,
  fileName,
  onCodeChange,
}: CodeUploadSectionProps) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  useEffect(() => {
    if (fileName?.toLowerCase().endsWith(".pdf")) {
      try {
        const sanitizedCode = code.replace(/\s/g, "").replace(/[^A-Za-z0-9+/=]/g, "");
        const binary = window.atob(sanitizedCode);
        const buffer = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          buffer[i] = binary.charCodeAt(i);
        }
        const blob = new Blob([buffer], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
        return () => URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error decoding Base64 or creating PDF Blob:", error);
        setPdfUrl(null);
      }
    } else {
      setPdfUrl(null);
    }
  }, [code, fileName]);

  const renderFileContent = () => {
    if (!fileName) {
      return (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          Select a file to view its contents
        </div>
      );
    }

    const fileNameLower = fileName.toLowerCase();

    if (fileNameLower.endsWith(".pdf") && pdfUrl) {
      return (
        <iframe
          src={pdfUrl}
          className="w-full h-full border-none"
          title="PDF viewer"
        />
      );
    } else if (
      fileNameLower.endsWith(".png") ||
      fileNameLower.endsWith(".jpg") ||
      fileNameLower.endsWith(".jpeg") ||
      fileNameLower.endsWith(".gif")
    ) {
      return (
        <div className="flex justify-center items-center h-full">
          <img
            src={`data:image/*;base64,${code}`}
            alt="File preview"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      );
    } else {
      return (
        <MonacoEditor
          height="calc(50vh - 3rem)"
          defaultLanguage="python"
          value={code}
          theme="vs-dark"
          onChange={(value) => {
            if (isEditable && value !== undefined) {
              onCodeChange(value);
            }
          }}
          options={{
            readOnly: !isEditable,
            lineNumbers: "on",
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            fontSize: 14,
            fontFamily: "Monaco, Menlo, 'Ubuntu Mono', Consolas, source-code-pro, monospace",
            automaticLayout: true,
            bracketPairColorization: { enabled: true },
            wordWrap: "on",
          }}
        />
      );
    }
  };

  return (
    <div className="flex flex-col h-[50vh] bg-background border border-border rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-3 bg-muted/50 border-b border-border">
        <h2 className="text-sm font-medium">
          {fileName || "No file selected"}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditable(!isEditable)}
            className="px-3 py-1 text-sm bg-muted hover:bg-muted/80 rounded-md transition-colors"
          >
            {isEditable ? "Cancel Edit" : "Edit"}
          </button>
          <button
            onClick={() => {
              setIsEditable(false);
              console.log("Code saved:", code);
            }}
            className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            disabled={!isEditable}
          >
            Save
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">{renderFileContent()}</div>
    </div>
  );
};