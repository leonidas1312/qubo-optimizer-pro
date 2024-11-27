import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Steps } from "@/components/ui/steps";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowRight, Bot, Database, Server } from "lucide-react";
import { DatasetSelector } from "@/components/solver/DatasetSelector";
import { HardwareSelector } from "@/components/solver/HardwareSelector";
import { SolverChat } from "@/components/solver/chat/SolverChat";
import { FileTree } from "@/components/github/FileTree";
import { CodeEditor } from "@/components/playground/editor/CodeEditor";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Solvers = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSolver, setSelectedSolver] = useState<any>(null);
  const [selectedDataset, setSelectedDataset] = useState<any>(null);
  const [selectedHardware, setSelectedHardware] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState("");
  const [createMode, setCreateMode] = useState<"ai" | "existing">("existing");

  const { data: repositories } = useQuery({
    queryKey: ['repositories'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8000/api/github/repos', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch repositories');
      return response.json();
    },
  });

  const { data: availableSolvers } = useQuery({
    queryKey: ['solvers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('solvers')
        .select('*')
        .eq('is_public', true);
      if (error) throw error;
      return data;
    },
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

  const renderStep1Content = () => {
    return (
      <div className="space-y-4">
        <Select value={createMode} onValueChange={(value: "ai" | "existing") => setCreateMode(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose solver creation method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="existing">Use Existing Solver</SelectItem>
            <SelectItem value="ai">Create with AI Assistant</SelectItem>
          </SelectContent>
        </Select>

        {createMode === "existing" ? (
          <Select value={selectedSolver?.id} onValueChange={(value) => {
            const solver = availableSolvers?.find(s => s.id === value);
            setSelectedSolver(solver);
          }}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a solver" />
            </SelectTrigger>
            <SelectContent>
              {availableSolvers?.map((solver) => (
                <SelectItem key={solver.id} value={solver.id}>
                  {solver.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <div className="grid grid-cols-12 gap-4 h-[600px]">
            <div className="col-span-3 border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Repository Files</h3>
              <FileTree files={repositories || []} onFileSelect={setSelectedFile} />
            </div>
            <div className="col-span-6">
              <SolverChat />
            </div>
            <div className="col-span-3 border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Selected File</h3>
              {selectedFile ? (
                <CodeEditor
                  value={fileContent}
                  onChange={setFileContent}
                  language="python"
                  className="h-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Select a file from the repository
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
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

          <div className="flex justify-between items-start mb-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex-1 ${
                  index < steps.length - 1
                    ? "border-t-2 border-muted relative"
                    : ""
                }`}
              >
                <div
                  className={`absolute top-0 left-0 transition-all duration-300 border-t-2 border-primary ${
                    index < currentStep
                      ? "w-full"
                      : index === currentStep
                      ? "w-1/2"
                      : "w-0"
                  }`}
                  style={{ transform: "translateY(-1px)" }}
                />
                <div className="pt-8">
                  <Steps steps={[step]} currentStep={index <= currentStep - 1 ? 1 : 0} />
                </div>
              </div>
            ))}
          </div>

          <Card className="p-6">
            {currentStep === 1 && renderStep1Content()}
            {currentStep === 2 && (
              <DatasetSelector
                selectedDataset={selectedDataset}
                onSelect={setSelectedDataset}
              />
            )}
            {currentStep === 3 && (
              <HardwareSelector
                selectedHardware={selectedHardware}
                onSelect={setSelectedHardware}
              />
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
                  className="ml-auto"
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