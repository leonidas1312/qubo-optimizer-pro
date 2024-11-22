import { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';

interface CodeUploadSectionProps {
  code: string;
  onCodeChange: (value: string) => void;
}

export const CodeUploadSection = ({ code, onCodeChange }: CodeUploadSectionProps) => {
  const lineHeight = 24;
  const minHeight = lineHeight * 10;
  const editorHeight = `${minHeight}px`;

  return (
    <div className="flex w-full h-screen">


      {/* Right Side Code Editor */}
      <div className="w-full p-6">
        <label className="block text-lg font-medium mb-2">
          Code
        </label>
        <div className="border rounded-lg overflow-hidden h-full">
          <MonacoEditor
            height="100%"
            defaultLanguage="python"
            value={code}
            theme="vs-dark" // Monaco's built-in dark theme
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
              bracketPairColorization: true,
              wordWrap: "on",
            }}
          />
        </div>
      </div>
    </div>
  );
};
