import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SolverPreview } from '@/components/solver/SolverPreview';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { supabase } from '@/integrations/supabase/client';
import type { Selection, QubotInput } from '@/types/qubot';
import { RepositorySection } from '@/components/upload/RepositorySection';
import { EditorSection } from '@/components/upload/EditorSection';
import { Card } from '@/components/ui/card';
import { Steps } from '@/components/ui/steps';

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
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="container mx-auto py-8 px-4 space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold gradient-text">Create a QUBOt Solver</h1>
            <p className="text-muted-foreground">
              Follow these steps to create your custom QUBO solver.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* Step 1: Basic Information */}
            <Card className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold">1</span>
                </div>
                <h2 className="text-xl font-semibold">Basic Information</h2>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Solver Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter a name for your solver"
                    className="max-w-md"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what your solver does and how it works"
                    className="max-w-md"
                  />
                </div>
              </div>
            </Card>

            {/* Step 2: Code Selection */}
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold">2</span>
                </div>
                <h2 className="text-xl font-semibold">Select Your Code</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel defaultSize={25} minSize={20}>
                      <RepositorySection
                        repositories={repositories}
                        selectedRepo={selectedRepo}
                        setSelectedRepo={setSelectedRepo}
                        fileStructure={fileStructure}
                        setFileStructure={setFileStructure}
                        onFileSelect={handleFileSelect}
                      />
                    </ResizablePanel>
                    
                    <ResizableHandle />
                    
                    <ResizablePanel defaultSize={75} minSize={30}>
                      <EditorSection
                        code={code}
                        setCode={setCode}
                        setInputParameters={setInputParameters}
                        setCostFunction={setCostFunction}
                        setAlgorithmLogic={setAlgorithmLogic}
                        handleCreateSolver={() => createQubot.mutate()}
                        name={name}
                        inputParameters={inputParameters}
                        costFunction={costFunction}
                        algorithmLogic={algorithmLogic}
                      />
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </div>

                <div className="lg:col-span-1">
                  <Card className="p-4 bg-black/50 backdrop-blur-sm border-white/10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-semibold">3</span>
                      </div>
                      <h2 className="text-xl font-semibold">Preview</h2>
                    </div>
                    <SolverPreview
                      name={name}
                      inputParameters={inputParameters}
                      costFunction={costFunction}
                      algorithmLogic={algorithmLogic}
                    />
                  </Card>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </DashboardLayout>
  );
};

export default UploadAlgos;