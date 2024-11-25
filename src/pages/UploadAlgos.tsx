import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { Github } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  const [inputParameters, setInputParameters] = useState<Selection | null>(null);
  const [costFunction, setCostFunction] = useState<Selection | null>(null);
  const [algorithmLogic, setAlgorithmLogic] = useState<Selection | null>(null);
  const [activeStep, setActiveStep] = useState('mark-code');

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
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="mark-code">1. Mark Code</TabsTrigger>
                <TabsTrigger value="preview">2. Preview</TabsTrigger>
              </TabsList>

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