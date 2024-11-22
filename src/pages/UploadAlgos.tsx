import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { CodeUploadSection } from '@/components/upload/CodeUploadSection';
import { RepositoryGrid } from '@/components/github/RepositoryGrid';
import { FileTree } from '@/components/github/FileTree';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

interface FileNode {
  name: string;
  path: string;
  type: "file" | "tree";
  children?: FileNode[];
}

const fetchRepositories = async () => {
  const response = await fetch('http://localhost:8000/api/github/repos', {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to fetch repositories');
  return response.json();
};

const fetchFileStructure = async (owner: string, repo: string) => {
  const response = await fetch(
    `http://localhost:8000/api/github/repos/${owner}/${repo}/tree`,
    { credentials: 'include' }
  );
  if (!response.ok) throw new Error('Failed to fetch file structure');
  return response.json();
};

const fetchFileContent = async (owner: string, repo: string, sha: string) => {
  const response = await fetch(
    `http://localhost:8000/api/github/repos/${owner}/${repo}/contents/${sha}`,
    { credentials: 'include' }
  );
  if (!response.ok) throw new Error('Failed to fetch file content');
  return response.json();
};

const UploadAlgos = () => {
  const { isAuthenticated } = useAuth();
  const [code, setCode] = useState('');
  const [selectedRepo, setSelectedRepo] = useState<{
    owner: string;
    name: string;
  } | null>(null);
  const [fileStructure, setFileStructure] = useState<FileNode[]>([]);

  const { data: repositories, isLoading } = useQuery({
    queryKey: ['repositories'],
    queryFn: fetchRepositories,
    enabled: isAuthenticated,
  });

  const handleAddFileStructure = async (repo: any) => {
    try {
      const [owner, repoName] = repo.full_name.split('/');
      setSelectedRepo({ owner, name: repoName });
      
      const structure = await fetchFileStructure(owner, repoName);
      if (structure.error) {
        throw new Error(structure.error);
      }
      setFileStructure(structure);
      
      toast.success('Repository files loaded successfully');
    } catch (error) {
      toast.error('Failed to load repository files');
      console.error('Error fetching file structure:', error);
    }
  };

  const handleFileSelect = async (sha: string) => {
    if (!selectedRepo) return;
    
    try {
      const content = await fetchFileContent(selectedRepo.owner, selectedRepo.name, sha);
      if (content.error) {
        throw new Error(content.error);
      }
      setCode(content.content);
      toast.success('File loaded successfully');
    } catch (error) {
      toast.error('Failed to load file');
      console.error('Error fetching file content:', error);
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
        <h1 className="text-3xl font-bold mb-6">Choose a repository</h1>

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

        {selectedRepo && (
          <div className="flex gap-6">
            <div className="w-1/4 min-w-[250px]">
              <h3 className="text-lg font-semibold mb-4">
                Files - {selectedRepo.name}
              </h3>
              <FileTree files={fileStructure} onFileSelect={handleFileSelect} />
            </div>
            <div className="flex-1">
              <CodeUploadSection code={code} onCodeChange={setCode} />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UploadAlgos;