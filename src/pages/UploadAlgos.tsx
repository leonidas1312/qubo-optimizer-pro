// pages/UploadAlgos.tsx

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { Code, File } from 'lucide-react';
// Import CodeMirror components
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { EditorView } from '@codemirror/view';

const UploadAlgos = () => {
  const navigate = useNavigate();

  // State variables
  const [code, setCode] = useState('');
  const [quboFile, setQuboFile] = useState<File | null>(null);
  const [executionStatus, setExecutionStatus] = useState('');
  const [executionResult, setExecutionResult] = useState<any>(null);





  // Handlers
  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  const handleQuboFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setQuboFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    // Validate code and QUBO file
    if (!code) {
      alert('Please provide your algorithm code.');
      return;
    }
    if (!quboFile) {
      alert('Please upload a QUBO matrix file.');
      return;
    }

    // Prepare data to send to backend
    const formData = new FormData();
    formData.append('code', new Blob([code], { type: 'text/plain' }));
    formData.append('quboFile', quboFile);

    // Update execution status
    setExecutionStatus('Running');

    try {
      // Send request to backend API
      const response = await fetch('/api/execute-algorithm', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      // Update execution result
      setExecutionResult(result);
      setExecutionStatus('Completed');
    } catch (error) {
      console.error('Execution error:', error);
      setExecutionStatus('Error');
    }
  };

  // Editor theme and styling
  const editorTheme = EditorView.theme({
    '&': {
      color: '#000000', // Black text
      backgroundColor: '#ffffff', // White background
    },
    '.cm-content': {
      fontFamily: 'monospace',
      fontSize: '14px',
    },
    '.cm-scroller': {
      overflow: 'hidden', // Hide internal scrollbars
    },
  });

  // Calculate the height for approximately 10 lines
  const lineHeight = 24; // Approximate line height in pixels (adjust if necessary)
  const minHeight = lineHeight * 10; // Minimum height for 10 lines

  // Custom style for the editor to set minHeight and allow expansion
  const editorStyle = {
    minHeight: `${minHeight}px`,
    height: 'auto',
    maxHeight: 'none',
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">
          Upload and Test Your Algorithm
        </h1>

        {/* Code Editor */}
        <div className="mb-8">
          <label className="block text-lg font-medium mb-2">
            Algorithm Code (Python)
          </label>
          <div className="border rounded-lg overflow-hidden">
            <CodeMirror
              value={code}
              extensions={[python(), editorTheme]}
              onChange={handleCodeChange}
              basicSetup={{
                lineNumbers: true,
                foldGutter: true,
                highlightActiveLine: true,
                syntaxHighlighting: true,
                bracketMatching: true,
                autocompletion: true,
              }}
              style={editorStyle}
            />
          </div>
        </div>

        {/* QUBO File Upload */}
        <div className="mb-8">
          <label className="block text-lg font-medium mb-2">
            Upload QUBO Matrix (.npy file)
          </label>
          <div className="flex items-center">
            <input
              type="file"
              accept=".npy"
              onChange={handleQuboFileChange}
            />
            {quboFile && (
              <span className="ml-4 text-sm text-gray-600">
                Selected file: {quboFile.name}
              </span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button size="lg" onClick={handleSubmit}>
          Run Algorithm
        </Button>

        {/* Execution Status */}
        {executionStatus && (
          <div className="mt-6">
            <p className="text-lg font-medium">
              Status: {executionStatus}
            </p>
          </div>
        )}

        {/* Execution Result */}
        {executionResult && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Execution Result</h2>
            {/* Display execution time */}
            <p className="mb-2">
              <strong>Execution Time:</strong> {executionResult.executionTime}{' '}
              seconds
            </p>
            {/* Display best cost function value */}
            <p className="mb-4">
              <strong>Best Cost Function Value:</strong>{' '}
              {executionResult.bestCost}
            </p>
            {/* Placeholder for optimization chart */}
            {/* You can integrate a chart library like Chart.js or Recharts to display the optimization chart */}
            {/* Example: */}
            {/* <OptimizationChart data={executionResult.optimizationData} /> */}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UploadAlgos;
