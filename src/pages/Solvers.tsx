import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Steps, StepsContent, StepsTrigger } from "@/components/ui/steps";
import { useState } from "react";
import { DefaultSolvers } from "@/components/qubots/DefaultSolvers";
import { SolverChat } from "@/components/solver/chat/SolverChat";
import { MatrixUpload } from "@/components/upload/MatrixUpload";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowRight, Bot, Database, Server } from "lucide-react";

const Solvers = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSolver, setSelectedSolver] = useState<any>(null);
  const [selectedDataset, setSelectedDataset] = useState<any>(null);
  const [selectedHardware, setSelectedHardware] = useState<any>(null);

  const { data: datasets } = useQuery({
    queryKey: ['datasets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('datasets')
        .select('*')
        .eq('is_public', true);
      if (error) throw error;
      return data;
    }
  });

  const { data: hardwareProviders } = useQuery({
    queryKey: ['hardware-providers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hardware_providers')
        .select('*')
        .eq('availability', true);
      if (error) throw error;
      return data;
    }
  });

  const handleNext = () => {
    if (currentStep === 1 && !selectedSolver) {
      toast.error("Please select or create a solver first");
      return;
    }
    if (currentStep === 2 && !selectedDataset) {
      toast.error("Please select a dataset");
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <DashboardLayout>
      <div className="container max-w-7xl mx-auto py-8 px-4">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold gradient-text">Create Your QUBOt</h1>
            <p className="text-muted-foreground mt-2">
              Configure your optimization solver in three simple steps
            </p>
          </div>

          <div className="flex items-center justify-between mb-8">
            {[
              { number: 1, title: "Configure Solver", icon: <Bot className="h-5 w-5" /> },
              { number: 2, title: "Select Dataset", icon: <Database className="h-5 w-5" /> },
              { number: 3, title: "Choose Hardware", icon: <Server className="h-5 w-5" /> }
            ].map((step) => (
              <div
                key={step.number}
                className={`flex items-center ${
                  step.number !== 3 ? "flex-1" : ""
                }`}
              >
                <div
                  className={`flex items-center justify-center ${
                    step.number !== 3 ? "w-full" : ""
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      currentStep === step.number
                        ? "border-primary bg-primary text-primary-foreground"
                        : currentStep > step.number
                        ? "border-primary bg-primary/20"
                        : "border-muted bg-background"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">Step {step.number}</p>
                    <h3 className="font-medium">{step.title}</h3>
                  </div>
                  {step.number !== 3 && (
                    <div className="flex-1 h-px bg-muted mx-4" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <Card className="p-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Available Solvers</h3>
                    <DefaultSolvers
                      onSelect={setSelectedSolver}
                      selectedSolverId={selectedSolver?.id}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Create Custom Solver</h3>
                    <SolverChat />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Select Dataset</h3>
                <div className="grid grid-cols-2 gap-4">
                  {datasets?.map((dataset) => (
                    <Card
                      key={dataset.id}
                      className={`p-4 hover:bg-accent cursor-pointer transition-colors ${
                        selectedDataset?.id === dataset.id ? 'border-2 border-primary' : ''
                      }`}
                      onClick={() => setSelectedDataset(dataset)}
                    >
                      <div className="flex items-center gap-3">
                        <Database className="h-6 w-6" />
                        <div>
                          <h4 className="font-medium">{dataset.name}</h4>
                          <p className="text-sm text-muted-foreground">{dataset.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                <MatrixUpload onMatrixLoaded={() => {}} />
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Select Hardware</h3>
                <div className="grid grid-cols-2 gap-4">
                  {hardwareProviders?.map((provider) => (
                    <Card
                      key={provider.id}
                      className={`p-4 hover:bg-accent cursor-pointer transition-colors ${
                        selectedHardware?.id === provider.id ? 'border-2 border-primary' : ''
                      }`}
                      onClick={() => setSelectedHardware(provider)}
                    >
                      <div className="flex items-center gap-3">
                        <Server className="h-6 w-6" />
                        <div>
                          <h4 className="font-medium">{provider.name}</h4>
                          <p className="text-sm text-muted-foreground">{provider.description}</p>
                          <p className="text-sm font-medium mt-2">${provider.cost_per_hour}/hour</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <Button onClick={handleBack} variant="outline">
                  Back
                </Button>
              )}
              {currentStep < 3 ? (
                <Button onClick={handleNext} className="ml-auto">
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  onClick={() => toast.success("QUBOt created successfully!")}
                  className="ml-auto bg-gradient-to-r from-blue-600 to-blue-800"
                >
                  Create QUBOt
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Solvers;