import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { CodeUploadSection } from '@/components/upload/CodeUploadSection';
import { RepositoryGrid } from '@/components/github/RepositoryGrid';
import { useQuery } from '@tanstack/react-query';

const fetchRepositories = async () => {
  const response = await fetch('http://localhost:8000/api/github/repos', {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to fetch repositories');
  return response.json();
};

const UploadAlgos = () => {
  const { isAuthenticated } = useAuth();
  const [code, setCode] = useState('');
  const [executionStatus, setExecutionStatus] = useState('');
  const [executionResult, setExecutionResult] = useState(null);
  const [fileStructure, setFileStructure] = useState(null); // State for file structure
  const [selectedRepo, setSelectedRepo] = useState(null); // State for selected repository

  const { data: repositories, isLoading } = useQuery({
    queryKey: ['repositories'],
    queryFn: fetchRepositories,
    enabled: isAuthenticated,
  });

  const handleAddFileStructure = (repo) => {
    // Assuming that the file structure is part of the repository data
    setFileStructure(repo.contents);
    setSelectedRepo(repo);
  };

  const handleSubmit = async () => {
    if (!code) {
      alert('Please provide your algorithm code.');
      return;
    }

    const formData = new FormData();
    formData.append('code', new Blob([code], { type: 'text/plain' }));

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
            You need to login with GitHub to use the workspace.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Choose a repository </h1>

        {isLoading ? (
          <div className="text-center py-8">Loading repositories...</div>
        ) : repositories ? (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Repositories</h2>
            <RepositoryGrid
              repositories={repositories}
              onAddFileStructure={handleAddFileStructure}
            />
          </div>
        ) : null}

        <div className="flex w-full h-screen">
          {/* File Structure Sidebar */}
          {fileStructure && (
            <div className="w-1/4 p-4 border-r border-gray-300">
              <h2 className="text-xl font-bold mb-4">
                File Structure - {selectedRepo?.name}
              </h2>
              <ul className="text-sm text-muted-foreground">
                {fileStructure.map((item) => (
                  <li key={item.path} className="mb-2">
                    {item.type === 'file' ? '📄' : '📁'} {item.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Code Editor Section */}
          <div className={fileStructure ? 'w-3/4 p-6' : 'w-full p-6'}>
            <CodeUploadSection code={code} onCodeChange={setCode} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UploadAlgos;
