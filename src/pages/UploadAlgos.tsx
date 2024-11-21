import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { EditorView } from '@codemirror/view';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const UploadAlgos = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [repositories, setRepositories] = useState([]);

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

  // Fetch repositories when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchRepositories();
    }
  }, [isAuthenticated]);

  const fetchRepositories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/github/repos', {
        credentials: 'include'
      });
      const data = await response.json();
      setRepositories(data);
    } catch (error) {
      console.error('Failed to fetch repositories:', error);
      toast.error('Failed to load repositories');
    }
  };

  if (!isAuthenticated) {
    return (
      <DashboardLayout>
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-6">Please Login</h1>
          <p className="text-muted-foreground">
            You need to login with GitHub to upload algorithms and view your repositories.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">
          Upload and Test Your Algorithm
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Repositories</h2>
            <div className="space-y-4">
              {repositories.map((repo: any) => (
                <Card key={repo.id} className="p-4">
                  <h3 className="font-medium">{repo.name}</h3>
                  <p className="text-sm text-muted-foreground">{repo.description}</p>
                  <div className="mt-2">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      View on GitHub
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">
              Algorithm Code (Python)
            </label>
            <div className="border rounded-lg overflow-hidden">
              <CodeMirror
                value={code}
                extensions={[python(), EditorView.theme({
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
                })]}
                onChange={handleCodeChange}
                basicSetup={{
                  lineNumbers: true,
                  foldGutter: true,
                  highlightActiveLine: true,
                  syntaxHighlighting: true,
                  bracketMatching: true,
                  autocompletion: true,
                }}
                style={{
                  minHeight: '240px',
                  height: 'auto',
                  maxHeight: 'none',
                }}
              />
            </div>
          </div>
        </div>

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

        <Button size="lg" onClick={handleSubmit}>
          Run Algorithm
        </Button>

        {executionStatus && (
          <div className="mt-6">
            <p className="text-lg font-medium">
              Status: {executionStatus}
            </p>
          </div>
        )}

        {executionResult && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Execution Result</h2>
            <p className="mb-2">
              <strong>Execution Time:</strong> {executionResult.executionTime}{' '}
              seconds
            </p>
            <p className="mb-4">
              <strong>Best Cost Function Value:</strong>{' '}
              {executionResult.bestCost}
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UploadAlgos;
