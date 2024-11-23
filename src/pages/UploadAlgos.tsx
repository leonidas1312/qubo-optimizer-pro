import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CodeUploadSection } from '@/components/upload/CodeUploadSection';
import { RepositoryGrid } from '@/components/github/RepositoryGrid';
import { FileTree } from '@/components/github/FileTree';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'tree';
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
  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data;
};

const fetchFileContent = async (owner: string, repo: string, path: string) => {
  const url = `http://localhost:8000/api/github/repos/${owner}/${repo}/contents/${path}`;
  const response = await fetch(url, { credentials: 'include' });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch file content: ${response.status} - ${errorText}`);
  }
  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data;
};

const UploadAlgos = () => {
  const { isAuthenticated } = useAuth();
  const [code, setCode] = useState('');
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
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
      setFileStructure(structure);
      toast.success('Repository files loaded successfully');
    } catch (error) {
      toast.error('Failed to load repository files');
      console.error('Error fetching file structure:', error);
    }
  };

  const handleFileSelect = async (path: string) => {
    if (!selectedRepo) return;
    try {
      const file = await fetchFileContent(selectedRepo.owner, selectedRepo.name, path);
      const sanitizedContent =
        file.encoding === 'base64'
          ? atob(file.content.replace(/\s/g, ''))
          : file.content;
      setCode(sanitizedContent);
      setSelectedFileName(path.split('/').pop() || null);
      toast.success('File loaded successfully');
    } catch (error) {
      toast.error(`Failed to load file: ${error.message}`);
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
        <h1 className="text-3xl font-bold mb-6">Workspace</h1>
        
        <div className="flex h-[calc(100vh-12rem)]">
          <div className="w-80 border-r border-border">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-semibold">Repositories</h2>
            </div>
            {isLoading ? (
              <div className="p-4 text-center">Loading repositories...</div>
            ) : repositories ? (
              <RepositoryGrid
                repositories={repositories}
                onAddFileStructure={handleAddFileStructure}
              />
            ) : null}
          </div>

          <div className="flex-1">
            {selectedRepo && (
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={25} minSize={20}>
                  <FileTree files={fileStructure} onFileSelect={handleFileSelect} />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={75} minSize={30}>
                  <CodeUploadSection
                    code={code}
                    fileName={selectedFileName}
                    onCodeChange={setCode}
                  />
                </ResizablePanel>
              </ResizablePanelGroup>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UploadAlgos;