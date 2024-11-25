import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { SolverSelector } from "@/components/qubots/SolverSelector";
import { HardwareSelector } from "@/components/qubots/HardwareSelector";
import { DatasetSelector } from "@/components/qubots/DatasetSelector";

const QUBOts = () => {
  const { isAuthenticated, user } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSolver, setSelectedSolver] = useState<string | null>(null);
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  const [selectedHardware, setSelectedHardware] = useState<string | null>(null);

  const { data: qubots, isLoading: loadingQubots } = useQuery({
    queryKey: ['qubots'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('qubots')
        .select('*')
        .eq('is_public', true);
      
      if (error) throw error;
      return data;
    }
  });

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

  const { data: hardware } = useQuery({
    queryKey: ['hardware'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hardware_providers')
        .select('*')
        .eq('availability', true);
      
      if (error) throw error;
      return data;
    }
  });

  const handleCreateQubot = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to create a QUBOt");
      return;
    }

    if (!name || !selectedSolver || !selectedDataset || !selectedHardware) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const { error } = await supabase
        .from('qubots')
        .insert({
          name,
          description,
          creator_id: user?.id,
          solver_type: selectedSolver,
          dataset_id: selectedDataset,
          hardware_id: selectedHardware,
          is_public: true
        });

      if (error) throw error;

      toast.success("QUBOt created successfully!");
      setName("");
      setDescription("");
      setSelectedSolver(null);
      setSelectedDataset(null);
      setSelectedHardware(null);
    } catch (error) {
      toast.error("Failed to create QUBOt");
      console.error(error);
    }
  };

  if (!isAuthenticated) {
    return (
      <DashboardLayout>
        <div className="container mx-auto py-8 px-4">
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
            <p className="text-muted-foreground">
              Please log in to create and manage QUBOts
            </p>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4 space-y-8">
        <div>
          <h1 className="text-4xl font-bold gradient-text">QUBOt Hub</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage your QUBOts - combinations of solvers, datasets, and hardware
          </p>
        </div>

        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Create QUBOt</TabsTrigger>
            <TabsTrigger value="browse">Browse QUBOts</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <Card className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">QUBOt Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter a name for your QUBOt"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what your QUBOt does"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <Label>Select Solver</Label>
                    <SolverSelector onSelect={setSelectedSolver} />
                  </div>

                  <div className="space-y-2">
                    <Label>Select Dataset</Label>
                    <DatasetSelector datasets={datasets} onSelect={setSelectedDataset} />
                  </div>

                  <div className="space-y-2">
                    <Label>Select Hardware</Label>
                    <HardwareSelector hardware={hardware} onSelect={setSelectedHardware} />
                  </div>
                </div>

                <Button onClick={handleCreateQubot} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Create QUBOt
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="browse" className="space-y-6">
            {loadingQubots ? (
              <Card className="p-8">
                <p className="text-center text-muted-foreground">Loading QUBOts...</p>
              </Card>
            ) : qubots?.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {qubots.map((qubot) => (
                  <Card key={qubot.id} className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold">{qubot.name}</h3>
                    <p className="text-muted-foreground">{qubot.description}</p>
                    <Button variant="outline" className="w-full">View Details</Button>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8">
                <p className="text-center text-muted-foreground">
                  No QUBOts found. Create one to get started!
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default QUBOts;