import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import type { Selection, QubotInput } from '@/types/qubot';
import { Github } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StepChooseFile } from '@/components/upload/steps/StepChooseFile';
import { StepMarkCode } from '@/components/upload/steps/StepMarkCode';
import { StepPreview } from '@/components/upload/steps/StepPreview';

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
  const [activeStep, setActiveStep] = useState('choose-file');

  const { data: repositories } = useQuery({
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
      // Reset form
      setCode('');
      setName('');
      setDescription('');
      setSelectedFileName(null);
      setSelectedRepo(null);
      setFileStructure([]);
      setInputParameters(null);
      setCostFunction(null);
      setAlgorithmLogic(null);
      setActiveStep('choose-file');
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
      setActiveStep('mark-code');
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
        <div>
          <h1 className="text-3xl font-bold gradient-text">Create QUBOt Solver</h1>
          <p className="text-muted-foreground mt-2">
            Build and share your optimization algorithms with the community
          </p>
        </div>

        <Tabs value={activeStep} onValueChange={setActiveStep} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="choose-file" className="data-[state=active]:bg-blue-600/10 data-[state=active]:text-blue-600">
              1. Choose a File
            </TabsTrigger>
            <TabsTrigger value="mark-code" className="data-[state=active]:bg-purple-600/10 data-[state=active]:text-purple-600">
              2. Mark the Code
            </TabsTrigger>
            <TabsTrigger value="preview" className="data-[state=active]:bg-green-600/10 data-[state=active]:text-green-600">
              3. QUBOt Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="choose-file">
            <StepChooseFile
              name={name}
              setName={setName}
              description={description}
              setDescription={setDescription}
              repositories={repositories || []}
              selectedRepo={selectedRepo}
              setSelectedRepo={handleSelectRepository}
              fileStructure={fileStructure}
              setFileStructure={setFileStructure}
              onFileSelect={handleFileSelect}
            />
          </TabsContent>

          <TabsContent value="mark-code">
            <StepMarkCode
              code={code}
              setCode={setCode}
              setInputParameters={setInputParameters}
              setCostFunction={setCostFunction}
              setAlgorithmLogic={setAlgorithmLogic}
            />
          </TabsContent>

          <TabsContent value="preview">
            <StepPreview
              name={name}
              inputParameters={inputParameters}
              costFunction={costFunction}
              algorithmLogic={algorithmLogic}
              onCreateSolver={() => createQubot.mutate()}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default UploadAlgos;