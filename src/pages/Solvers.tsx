import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SolverChat } from "@/components/solver/chat/SolverChat";
import { DefaultSolvers } from "@/components/qubots/DefaultSolvers";
import { FileTree } from "@/components/github/FileTree";
import { Steps, StepsContent, StepsTrigger } from "@/components/ui/steps";
import { CircuitBoard, Database, Cpu, Plus, MessageSquare } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { MatrixUpload } from "@/components/upload/MatrixUpload";

const Solvers = () => {
  const navigate = useNavigate();
  const [selectedSolver, setSelectedSolver] = useState<any>(null);
  const [showChat, setShowChat] = useState(false);
  const [fileStructure, setFileStructure] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState<any>(null);
  const [selectedHardware, setSelectedHardware] = useState<any>(null);

  const handleSolverSelect = (solver: any) => {
    setSelectedSolver(solver);
    toast.success(`Selected ${solver.name} solver`);
  };

  const handleCreateCustom = () => {
    setShowChat(true);
  };

  return (
    <DashboardLayout>
      <div className="container max-w-7xl mx-auto py-8 px-4">
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold gradient-text">Create a QUBOt</h1>
            <p className="text-xl text-muted-foreground">
              Build your optimization solution in three simple steps
            </p>
          </div>

          <Steps value="solver" className="w-full">
            <div className="flex justify-between">
              <StepsTrigger value="solver" className="group">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <CircuitBoard className="h-6 w-6" />
                  </div>
                  <span>Choose Solver</span>
                </div>
              </StepsTrigger>
              <StepsTrigger value="dataset" className="group">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Database className="h-6 w-6" />
                  </div>
                  <span>Select Dataset</span>
                </div>
              </StepsTrigger>
              <StepsTrigger value="hardware" className="group">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Cpu className="h-6 w-6" />
                  </div>
                  <span>Configure Hardware</span>
                </div>
              </StepsTrigger>
            </div>

            <StepsContent value="solver" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <Card className="p-6 bg-black/50 backdrop-blur-sm border-white/10">
                    <h2 className="text-2xl font-semibold mb-4">Available Solvers</h2>
                    <DefaultSolvers 
                      onSelect={handleSolverSelect}
                      selectedSolverId={selectedSolver?.id}
                    />
                    <div className="mt-6">
                      <Button
                        onClick={handleCreateCustom}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Create Custom Solver
                      </Button>
                    </div>
                  </Card>
                </div>

                {showChat ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="col-span-2 p-4 bg-black/50 backdrop-blur-sm border-white/10">
                        <div className="flex items-center gap-2 mb-4">
                          <MessageSquare className="h-5 w-5 text-blue-400" />
                          <h3 className="font-medium">AI Assistant</h3>
                        </div>
                        <SolverChat />
                      </Card>
                      <Card className="col-span-2 p-4 bg-black/50 backdrop-blur-sm border-white/10">
                        <FileTree files={fileStructure} onFileSelect={() => {}} />
                      </Card>
                    </div>
                  </div>
                ) : (
                  <Card className="p-6 bg-black/50 backdrop-blur-sm border-white/10">
                    <h2 className="text-2xl font-semibold mb-4">Selected Solver</h2>
                    {selectedSolver ? (
                      <div className="space-y-4">
                        <h3 className="text-xl font-medium">{selectedSolver.name}</h3>
                        <p className="text-muted-foreground">{selectedSolver.description}</p>
                        <div className="space-y-2">
                          <h4 className="font-medium">Parameters:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {Object.entries(selectedSolver.parameters).map(([key, value]) => (
                              <li key={key}>
                                {key}: <span className="text-primary">{value}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">
                        Select a solver from the list or create your own custom solver
                      </p>
                    )}
                  </Card>
                )}
              </div>
            </StepsContent>

            <StepsContent value="dataset" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 bg-black/50 backdrop-blur-sm border-white/10">
                  <h2 className="text-2xl font-semibold mb-4">Upload Dataset</h2>
                  <MatrixUpload onMatrixLoaded={() => {}} />
                </Card>
                <Card className="p-6 bg-black/50 backdrop-blur-sm border-white/10">
                  <h2 className="text-2xl font-semibold mb-4">Available Datasets</h2>
                  <p className="text-muted-foreground">
                    Choose from our collection of pre-processed QUBO problem datasets
                  </p>
                </Card>
              </div>
            </StepsContent>

            <StepsContent value="hardware" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 bg-black/50 backdrop-blur-sm border-white/10">
                  <h2 className="text-2xl font-semibold mb-4">Hardware Configuration</h2>
                  <p className="text-muted-foreground">
                    Select the computing resources for your QUBOt
                  </p>
                </Card>
              </div>
            </StepsContent>
          </Steps>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Solvers;