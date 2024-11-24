import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import type { Selection, QubotInput } from '@/types/qubot';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileTree } from '@/components/github/FileTree';
import { RepositoryCombobox } from '@/components/github/RepositoryCombobox';
import { CodeEditor } from '@/components/playground/editor/CodeEditor';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Github, Code, Settings } from 'lucide-react';

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
  const [fileStructure, setFileStructure] = useState<any[]>([]);
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

      const qubotData: QubotInput & { creator_id: string } = {
        name,
        description,
        creator_id: profile.id,
        repository_url: selectedRepo ? `https://github.com/${selectedRepo.full_name}` : null,
        file_path: selectedFileName,
        input_parameters: inputParameters ? [{
          start: inputParameters.start,
          end: inputParameters.end,
          text: inputParameters.text
        }] : [],
        cost_function: costFunction?.text,
        algorithm_logic: algorithmLogic?.text,
        is_public: true,
        solver_type: 'simulated-annealing',
        solver_parameters: {}
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

  const handleSelectRepository = async (repo: any) => {
    try {
      const [owner, repoName] = repo.full_name.split('/');
      setSelectedRepo({ owner, name: repoName, full_name: repo.full_name });
      
      const response = await fetch(
        `http://localhost:8000/api/github/repos/${owner}/${repoName}/tree`,
        { credentials: 'include' }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch repository structure');
      }
      
      const structure = await response.json();
      setFileStructure(structure);
      toast.success('Repository files loaded successfully');
    } catch (error) {
      toast.error('Failed to load repository files');
      console.error('Error fetching repository structure:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <DashboardLayout>
        <div className="container mx-auto py-8 px-4">
          <Card className="p-8 text-center space-y-4">
            <Github className="w-12 h-12 mx-auto text-muted-foreground" />
            <h1 className="text-2xl font-bold">GitHub Authentication Required</h1>
            <p className="text-muted-foreground">
              Please login with GitHub to create and manage your QUBOt solvers.
            </p>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Create QUBOt Solver</h1>
            <p className="text-muted-foreground mt-2">
              Build and share your optimization algorithms with the community
            </p>
          </div>
          <Button
            onClick={() => createQubot.mutate()}
            disabled={!name || !inputParameters || !costFunction || !algorithmLogic}
            className="bg-gradient-to-r from-blue-600 to-blue-800"
          >
            Create QUBOt
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="repository" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="repository" className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              Repository
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Code
            </TabsTrigger>
          </TabsList>

          <TabsContent value="repository" className="space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Basic Information</label>
                  <Input
                    placeholder="Solver Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="h-24"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Repository</label>
                  <RepositoryCombobox
                    repositories={repositories || []}
                    onSelectRepository={handleSelectRepository}
                  />
                </div>

                {selectedRepo && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Repository Files</label>
                    <Card className="h-[400px] overflow-hidden">
                      <FileTree files={fileStructure} onFileSelect={handleFileSelect} />
                    </Card>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="code" className="space-y-6">
            <Card className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-sm font-medium">Code Editor</label>
                  <CodeEditor
                    value={code}
                    onChange={setCode}
                    onSelectInputParameters={setInputParameters}
                    onSelectCostFunction={setCostFunction}
                    onSelectAlgorithmLogic={setAlgorithmLogic}
                    language="python"
                  />
                </div>

                <div className="space-y-6">
                  <Card className="p-4 space-y-4 bg-black/50">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Input Parameters</label>
                      <div className="flex flex-wrap gap-2">
                        {inputParameters ? (
                          inputParameters.text.split(',').map((param, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="px-3 py-1 bg-blue-500/10"
                            >
                              {param.trim()}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            Select input parameters in the code editor
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Cost Function</label>
                      {costFunction ? (
                        <pre className="bg-black/30 p-3 rounded-md text-xs overflow-x-auto">
                          {costFunction.text}
                        </pre>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Select cost function in the code editor
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Algorithm Logic</label>
                      {algorithmLogic ? (
                        <pre className="bg-black/30 p-3 rounded-md text-xs overflow-x-auto">
                          {algorithmLogic.text}
                        </pre>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Select algorithm logic in the code editor
                        </p>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default UploadAlgos;