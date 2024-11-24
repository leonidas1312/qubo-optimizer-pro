import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { RepositoryCombobox } from '@/components/github/RepositoryCombobox';
import { FileTree } from '@/components/github/FileTree';
import { CodeEditor } from '@/components/playground/editor/CodeEditor';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import type { Selection, QubotInput } from '@/types/qubot';

interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'tree';
  children?: FileNode[];
}

const UploadAlgos = () => {
  const { isAuthenticated, user } = useAuth();
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<{
    owner: string;
    name: string;
    full_name: string;
  } | null>(null);
  const [fileStructure, setFileStructure] = useState<FileNode[]>([]);
  const [inputParameters, setInputParameters] = useState<Selection | null>(null);
  const [costFunction, setCostFunction] = useState<Selection | null>(null);
  const [algorithmLogic, setAlgorithmLogic] = useState<Selection | null>(null);

  const { data: repositories, isLoading } = useQuery({
    queryKey: ['repositories'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8000/api/github/repos', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch repositories');
      return response.json();
    },
    enabled: isAuthenticated,
  });

  const createQubot = useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (!profile) throw new Error('Profile not found');

      // Transform the input parameters to a format compatible with JSONB
      const transformedParams = inputParameters ? [{
        start: inputParameters.start,
        end: inputParameters.end,
        text: inputParameters.text
      }] : [];

      const qubotData: QubotInput = {
        name,
        description,
        creator_id: profile.id,
        repository_url: selectedRepo ? `https://github.com/${selectedRepo.full_name}` : null,
        file_path: selectedFileName,
        input_parameters: transformedParams,
        cost_function: costFunction?.text,
        algorithm_logic: algorithmLogic?.text,
        is_public: true
      };

      const { data, error } = await supabase
        .from('qubots')
        .insert(qubotData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('QUBOt created successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to create QUBOt: ${error.message}`);
    },
  });

  const handleSelectRepository = async (repo: any) => {
    try {
      const [owner, repoName] = repo.full_name.split('/');
      setSelectedRepo({ owner, name: repoName, full_name: repo.full_name });
      const response = await fetch(
        `http://localhost:8000/api/github/repos/${owner}/${repoName}/tree`,
        { credentials: 'include' }
      );
      if (!response.ok) throw new Error('Failed to fetch file structure');
      const structure = await response.json();
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
      const response = await fetch(
        `http://localhost:8000/api/github/repos/${selectedRepo.owner}/${selectedRepo.name}/contents/${path}`,
        { credentials: 'include' }
      );
      if (!response.ok) throw new Error('Failed to fetch file content');
      const data = await response.json();
      const content = atob(data.content.replace(/\s/g, ''));
      setCode(content);
      setSelectedFileName(path);
      toast.success('File loaded successfully');
    } catch (error) {
      toast.error('Failed to load file');
      console.error('Error fetching file content:', error);
    }
  };

  const handleCreateSolver = () => {
    if (!name) {
      toast.error('Please provide a name for your solver');
      return;
    }
    if (!inputParameters || !costFunction || !algorithmLogic) {
      toast.error('Please select all required code sections');
      return;
    }
    createQubot.mutate();
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
        <h1 className="text-3xl font-bold mb-6">Create a QUBOt Solver</h1>
        
        <div className="mb-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Solver Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter a name for your solver"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your solver"
            />
          </div>
        </div>

        <div className="h-[calc(100vh-20rem)]">
          <ResizablePanelGroup direction="horizontal">
            {/* Left Panel: RepositoryCombobox and FileTree */}
            <ResizablePanel defaultSize={25} minSize={20}>
              <div className="border-r border-border h-full p-4">
                <h2 className="text-lg font-semibold mb-4">Select Repository</h2>
                {isLoading ? (
                  <div className="text-center">Loading repositories...</div>
                ) : repositories ? (
                  <>
                    <RepositoryCombobox
                      repositories={repositories}
                      onSelectRepository={handleSelectRepository}
                    />
                    {selectedRepo && (
                      <div className="mt-4 h-[calc(100vh-24rem)]">
                        <ScrollArea className="h-full rounded-md border">
                          <FileTree files={fileStructure} onFileSelect={handleFileSelect} />
                        </ScrollArea>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center text-muted-foreground">
                    No repositories found.
                  </div>
                )}
              </div>
            </ResizablePanel>
            
            <ResizableHandle />
            
            {/* Right Panel: Code Editor and Selection Tools */}
            <ResizablePanel defaultSize={75} minSize={30}>
              <div className="h-full p-4 space-y-4">
                <div className="flex gap-4 mb-4">
                  <Button
                    variant={inputParameters ? "default" : "outline"}
                    onClick={() => {
                      const selection = window.getSelection();
                      if (selection && selection.toString()) {
                        setInputParameters({
                          start: selection.anchorOffset,
                          end: selection.focusOffset,
                          text: selection.toString(),
                        });
                        toast.success('Input parameters selected');
                      }
                    }}
                  >
                    Mark Input Parameters
                  </Button>
                  <Button
                    variant={costFunction ? "default" : "outline"}
                    onClick={() => {
                      const selection = window.getSelection();
                      if (selection && selection.toString()) {
                        setCostFunction({
                          start: selection.anchorOffset,
                          end: selection.focusOffset,
                          text: selection.toString(),
                        });
                        toast.success('Cost function selected');
                      }
                    }}
                  >
                    Mark Cost Function
                  </Button>
                  <Button
                    variant={algorithmLogic ? "default" : "outline"}
                    onClick={() => {
                      const selection = window.getSelection();
                      if (selection && selection.toString()) {
                        setAlgorithmLogic({
                          start: selection.anchorOffset,
                          end: selection.focusOffset,
                          text: selection.toString(),
                        });
                        toast.success('Algorithm logic selected');
                      }
                    }}
                  >
                    Mark Algorithm Logic
                  </Button>
                </div>

                {code ? (
                  <CodeEditor
                    value={code}
                    onChange={setCode}
                    className="h-[calc(100vh-28rem)]"
                    language="python"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">
                      Select a Python file from the repository to create your solver.
                    </p>
                  </div>
                )}

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleCreateSolver}
                  disabled={!name || !inputParameters || !costFunction || !algorithmLogic}
                >
                  Create QUBOt Solver
                </Button>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UploadAlgos;