import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { Github } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StepChooseFile } from '@/components/upload/steps/StepChooseFile';
import { StepMarkCode } from '@/components/upload/steps/StepMarkCode';
import { StepPreview } from '@/components/upload/steps/StepPreview';
import { TransformationSteps } from '@/components/solver/TransformationSteps';
import type { Selection } from '@/types/qubot';

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
            Transform your Python optimization code into a QUBOt solver
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Tabs value={activeStep} onValueChange={setActiveStep}>
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="choose-file">1. Choose File</TabsTrigger>
                <TabsTrigger value="mark-code">2. Mark Code</TabsTrigger>
                <TabsTrigger value="preview">3. Preview</TabsTrigger>
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
                  onCreateSolver={() => {
                    // Handle solver creation
                    toast.success('QUBOt solver created successfully!');
                  }}
                />
              </TabsContent>
            </Tabs>
          </div>

          <TransformationSteps
            inputParameters={inputParameters?.text || null}
            costFunction={costFunction?.text || null}
            algorithmLogic={algorithmLogic?.text || null}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UploadAlgos;
