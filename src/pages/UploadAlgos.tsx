import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import type { Selection, QubotInput } from '@/types/qubot';
import { StepOne } from '@/components/upload/StepOne';
import { StepTwo } from '@/components/upload/StepTwo';

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

          <div className="space-y-8">
            <StepOne
              name={name}
              setName={setName}
              description={description}
              setDescription={setDescription}
              repositories={repositories}
              selectedRepo={selectedRepo}
              setSelectedRepo={setSelectedRepo}
              fileStructure={fileStructure}
              setFileStructure={setFileStructure}
              onFileSelect={handleFileSelect}
            />

            <StepTwo
              code={code}
              setCode={setCode}
              name={name}
              inputParameters={inputParameters}
              costFunction={costFunction}
              algorithmLogic={algorithmLogic}
              setInputParameters={setInputParameters}
              setCostFunction={setCostFunction}
              setAlgorithmLogic={setAlgorithmLogic}
              onCreateSolver={() => createQubot.mutate()}
            />
          </div>
        </div>
      </ScrollArea>
    </DashboardLayout>
  );
};

export default UploadAlgos;