import { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";

interface CodeUploadSectionProps {
  code: string; // Base64 content of the file
  fileName: string | null; // Name of the file
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
    if (fileName && fileName.toLowerCase().endsWith(".pdf")) {
      try {
        const sanitizedCode = code.replace(/\s/g, "").replace(/[^A-Za-z0-9+/=]/g, "");
        const binary = window.atob(sanitizedCode);
        const len = binary.length;
        const buffer = new Uint8Array(len);

        for (let i = 0; i < len; i++) {
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
        <div className="flex items-center justify-center h-full text-gray-500">
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
          height="20rem" // Approximately 20 lines of code
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
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            fontFamily: "monospace",
            automaticLayout: true,
            bracketPairColorization: { enabled: true },
            wordWrap: "on",
          }}
        />
      );
    }
  };

  const handleEditToggle = () => setIsEditable(!isEditable);
  const handleSave = () => {
    setIsEditable(false);
    console.log("Code saved:", code);
  };
  const handleMoveToPlayground = () => {
    console.log("Move to Playground clicked:", code);
  };

  return (
    <div className="flex flex-col h-full bg-black text-white rounded shadow-lg">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4 bg-black border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">
          {fileName || "No file selected"}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={handleEditToggle}
            className="px-4 py-2 bg-white text-black border rounded hover:bg-gray-100"
          >
            {isEditable ? "Cancel Edit" : "Edit"}
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-white text-black border rounded hover:bg-gray-100"
            disabled={!isEditable}
          >
            Save
          </button>
          <button
            onClick={handleMoveToPlayground}
            className="px-4 py-2 bg-white text-black border rounded hover:bg-gray-100"
          >
            Move to Playground
          </button>
        </div>
      </div>
      {/* Content Area */}
      <div className="flex-1 p-4 overflow-auto">{renderFileContent()}</div>
    </div>
  );
};
