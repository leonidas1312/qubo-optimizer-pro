import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { CodeUploadSection } from '@/components/upload/CodeUploadSection';
import { FileUploadSection } from '@/components/upload/FileUploadSection';
import { ExecutionStatus } from '@/components/upload/ExecutionStatus';
import { RepositoryGrid } from '@/components/github/RepositoryGrid';
import { useQuery } from '@tanstack/react-query';

const fetchRepositories = async () => {
  const response = await fetch('http://localhost:8000/api/github/repos', {
    credentials: 'include'
  });
  if (!response.ok) throw new Error('Failed to fetch repositories');
  return response.json();
};

const UploadAlgos = () => {
  const { isAuthenticated } = useAuth();
  const [code, setCode] = useState('');
  const [quboFile, setQuboFile] = useState<File | null>(null);
  const [executionStatus, setExecutionStatus] = useState('');
  const [executionResult, setExecutionResult] = useState<any>(null);

  const { data: repositories, isLoading } = useQuery({
    queryKey: ['repositories'],
    queryFn: fetchRepositories,
    enabled: isAuthenticated,
  });

  const handleQuboFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setQuboFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!code) {
      alert('Please provide your algorithm code.');
      return;
    }
    if (!quboFile) {
      alert('Please upload a QUBO matrix file.');
      return;
    }

    const formData = new FormData();
    formData.append('code', new Blob([code], { type: 'text/plain' }));
    formData.append('quboFile', quboFile);

    setExecutionStatus('Running');

    try {
      const response = await fetch('/api/execute-algorithm', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      setExecutionResult(result);
      setExecutionStatus('Completed');
    } catch (error) {
      console.error('Execution error:', error);
      setExecutionStatus('Error');
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
        <h1 className="text-3xl font-bold mb-6">Upload and Test Your Algorithm</h1>

        {isLoading ? (
          <div className="text-center py-8">Loading repositories...</div>
        ) : repositories ? (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Repositories</h2>
            <RepositoryGrid repositories={repositories} />
          </div>
        ) : null}

        <CodeUploadSection code={code} onCodeChange={setCode} />
        <FileUploadSection quboFile={quboFile} onFileChange={handleQuboFileChange} />

        <Button size="lg" onClick={handleSubmit}>
          Run Algorithm
        </Button>

        <ExecutionStatus status={executionStatus} result={executionResult} />
      </div>
    </DashboardLayout>
  );
};

export default UploadAlgos;