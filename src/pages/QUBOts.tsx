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
import { Plus, Code2, Database, Cpu } from "lucide-react";

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

  const { data: solvers } = useQuery({
    queryKey: ['solvers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('qubots')
        .select('*')
        .eq('is_public', true)
        .eq('solver_type', 'solver');
      
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
      const { error } = await supabase.from('qubots').insert({
        name,
        description,
        creator_id: user?.id,
        solver_id: selectedSolver,
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-4 space-y-4">
                    <div className="flex items-center gap-2">
                      <Code2 className="h-5 w-5" />
                      <h3 className="font-medium">Select Solver</h3>
                    </div>
                    <div className="space-y-2">
                      {solvers?.map((solver) => (
                        <Button
                          key={solver.id}
                          variant={selectedSolver === solver.id ? "default" : "outline"}
                          className="w-full justify-start"
                          onClick={() => setSelectedSolver(solver.id)}
                        >
                          {solver.name}
                        </Button>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-4 space-y-4">
                    <div className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      <h3 className="font-medium">Select Dataset</h3>
                    </div>
                    <div className="space-y-2">
                      {datasets?.map((dataset) => (
                        <Button
                          key={dataset.id}
                          variant={selectedDataset === dataset.id ? "default" : "outline"}
                          className="w-full justify-start"
                          onClick={() => setSelectedDataset(dataset.id)}
                        >
                          {dataset.name}
                        </Button>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-4 space-y-4">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-5 w-5" />
                      <h3 className="font-medium">Select Hardware</h3>
                    </div>
                    <div className="space-y-2">
                      {hardware?.map((hw) => (
                        <Button
                          key={hw.id}
                          variant={selectedHardware === hw.id ? "default" : "outline"}
                          className="w-full justify-start"
                          onClick={() => setSelectedHardware(hw.id)}
                        >
                          {hw.name}
                        </Button>
                      ))}
                    </div>
                  </Card>
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