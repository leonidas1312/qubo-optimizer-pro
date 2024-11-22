import { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { toast } from 'sonner';

interface CodeUploadSectionProps {
  code: string;
  onCodeChange: (value: string) => void;
}

interface FileContent {
  content: string;
  encoding: string;
  type: string;
  name: string;
}

export const CodeUploadSection = ({ code, onCodeChange }: CodeUploadSectionProps) => {
  const [selectedFile, setSelectedFile] = useState<FileContent | null>(null);

  const renderFileContent = () => {
    if (!selectedFile) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500">
          Select a file to view its contents
        </div>
      );
    }

    const fileName = selectedFile.name.toLowerCase();
    const fileContent = selectedFile.encoding === 'base64' 
      ? atob(selectedFile.content)
      : selectedFile.content;

    // Handle different file types
    if (fileName.endsWith('.pdf')) {
      return (
        <iframe
          src={`data:application/pdf;base64,${selectedFile.content}`}
          className="w-full h-full"
          title="PDF viewer"
        />
      );
    } else if (
      fileName.endsWith('.png') ||
      fileName.endsWith('.jpg') ||
      fileName.endsWith('.jpeg') ||
      fileName.endsWith('.gif')
    ) {
      return (
        <img
          src={`data:image/*;base64,${selectedFile.content}`}
          alt="File preview"
          className="max-w-full max-h-full object-contain"
        />
      );
    } else if (
      fileName.endsWith('.xlsx') ||
      fileName.endsWith('.xls') ||
      fileName.endsWith('.csv')
    ) {
      return (
        <div className="p-4">
          <p>Excel/CSV preview is not supported in the browser.</p>
          <a
            href={`data:application/octet-stream;base64,${selectedFile.content}`}
            download={selectedFile.name}
            className="text-blue-500 hover:underline"
          >
            Download file
          </a>
        </div>
      );
    } else {
      // Default to code editor for text files
      return (
        <MonacoEditor
          height="100%"
          defaultLanguage="python"
          value={fileContent}
          theme="vs-dark"
          onChange={(value) => {
            if (value !== undefined) {
              onCodeChange(value);
            }
          }}
          options={{
            lineNumbers: 'on',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            fontFamily: 'monospace',
            automaticLayout: true,
            bracketPairColorization: { enabled: true },
            wordWrap: "on",
          }}
        />
      );
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 p-6">
        <h1 className="text-2xl font-bold mb-4">Algorithm Information</h1>
        <p className="text-lg">
          Here you can provide some information or explanation about the algorithm.
          This section will occupy the left half of the page.
        </p>
      </div>

      <div className="w-1/2 p-6">
        <label className="block text-lg font-medium mb-2">
          File Content
        </label>
        <div className="border rounded-lg overflow-hidden h-full">
          {renderFileContent()}
        </div>
      </div>
    </div>
  );
};