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

// Since this file is too long, let's split it into smaller components
import { DatasetSelector } from "@/components/solver/DatasetSelector";
import { HardwareSelector } from "@/components/solver/HardwareSelector";
import { SolverSelector } from "@/components/solver/SolverSelector";

const Solvers = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSolver, setSelectedSolver] = useState<any>(null);
  const [selectedDataset, setSelectedDataset] = useState<any>(null);
  const [selectedHardware, setSelectedHardware] = useState<any>(null);

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

  const steps = [
    { 
      title: "Configure Solver",
      description: "Choose or create a solver"
    },
    {
      title: "Select Dataset",
      description: "Add data to test your solver"
    },
    {
      title: "Choose Hardware",
      description: "Select where to run your solver"
    }
  ];

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

          <Steps steps={steps} currentStep={currentStep} />

          <Card className="p-6">
            <StepsContent step={1} currentStep={currentStep}>
              <SolverSelector 
                selectedSolver={selectedSolver}
                onSelect={setSelectedSolver}
              />
            </StepsContent>

            <StepsContent step={2} currentStep={currentStep}>
              <DatasetSelector
                selectedDataset={selectedDataset}
                onSelect={setSelectedDataset}
              />
            </StepsContent>

            <StepsContent step={3} currentStep={currentStep}>
              <HardwareSelector
                selectedHardware={selectedHardware}
                onSelect={setSelectedHardware}
              />
            </StepsContent>

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <Button onClick={handleBack} variant="outline">
                  Back
                </Button>
              )}
              {currentStep < 3 ? (
                <StepsTrigger onClick={handleNext}>
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </StepsTrigger>
              ) : (
                <StepsTrigger 
                  onClick={() => toast.success("QUBOt created successfully!")}
                >
                  Create QUBOt
                  <ArrowRight className="ml-2 h-4 w-4" />
                </StepsTrigger>
              )}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Solvers;