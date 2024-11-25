import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DefaultSolvers } from "./DefaultSolvers";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { Tables } from "@/integrations/supabase/types";
import { Badge } from "@/components/ui/badge";
import { Database, FileJson, HardDrive, Server, Cpu } from "lucide-react";

type Dataset = Tables<"datasets">;
type HardwareProvider = Tables<"hardware_providers">;

export const CreateQUBOtForm = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSolver, setSelectedSolver] = useState<{
    id: string;
    name: string;
    parameters: Record<string, any>;
  } | null>(null);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [selectedHardware, setSelectedHardware] = useState<HardwareProvider | null>(null);

  const { data: datasets } = useQuery({
    queryKey: ['datasets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('datasets')
        .select('*, profiles(username)');
      
      if (error) throw error;
      return data;
    },
  });

  const { data: hardwareProviders } = useQuery({
    queryKey: ['hardware-providers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hardware_providers')
        .select('*');
      
      if (error) throw error;
      return data;
    },
  });

  const handleCreateQubot = async () => {
    if (!user) {
      toast.error("Please log in to create a QUBOt");
      return;
    }

    if (!name || !selectedSolver) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const { error } = await supabase
        .from('qubots')
        .insert({
          name,
          description,
          creator_id: user.id,
          solver_type: selectedSolver.id,
          solver_parameters: selectedSolver.parameters,
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

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "Unknown size";
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  return (
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

        <div className="space-y-4">
          <Label>Select a Solver</Label>
          <DefaultSolvers onSelect={setSelectedSolver} />
        </div>

        <div className="space-y-4">
          <Label>Select a Dataset</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {datasets?.map((dataset) => (
              <Card
                key={dataset.id}
                className={`p-4 hover:bg-accent cursor-pointer transition-colors ${
                  selectedDataset?.id === dataset.id ? 'border-primary' : ''
                }`}
                onClick={() => {
                  setSelectedDataset(dataset);
                  toast.success(`Selected dataset: ${dataset.name}`);
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {dataset.format === 'json' ? (
                      <FileJson className="h-6 w-6 text-yellow-500" />
                    ) : (
                      <Database className="h-6 w-6 text-blue-500" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{dataset.name}</h4>
                    <p className="text-sm text-muted-foreground">{dataset.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline" className="bg-background">
                        Format: {dataset.format}
                      </Badge>
                      <Badge variant="outline" className="bg-background">
                        Size: {formatFileSize(dataset.size)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label>Select Hardware</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hardwareProviders?.map((provider) => (
              <Card
                key={provider.id}
                className={`p-4 hover:bg-accent cursor-pointer transition-colors ${
                  selectedHardware?.id === provider.id ? 'border-primary' : ''
                }`}
                onClick={() => {
                  setSelectedHardware(provider);
                  toast.success(`Selected hardware: ${provider.name}`);
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {provider.provider_type === 'CPU' ? (
                      <Cpu className="h-6 w-6 text-blue-500" />
                    ) : provider.provider_type === 'GPU' ? (
                      <Server className="h-6 w-6 text-purple-500" />
                    ) : (
                      <HardDrive className="h-6 w-6 text-green-500" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{provider.name}</h4>
                    <p className="text-sm text-muted-foreground">{provider.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {Object.entries(provider.specs as Record<string, string>).map(([key, value]) => (
                        <Badge key={key} variant="outline" className="bg-background">
                          {key}: {value}
                        </Badge>
                      ))}
                      <Badge variant="outline" className="bg-background text-primary font-semibold">
                        ${provider.cost_per_hour}/hour
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Button onClick={handleCreateQubot} className="w-full">
          Create QUBOt
        </Button>
      </div>
    </Card>
  );
};