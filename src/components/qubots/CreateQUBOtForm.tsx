import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tables } from "@/integrations/supabase/types";
import { SolverSection } from "./sections/SolverSection";
import { DatasetSection } from "./sections/DatasetSection";
import { HardwareSection } from "./sections/HardwareSection";
import { useSession } from '@supabase/auth-helpers-react';
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

type Dataset = Tables<"datasets">;
type HardwareProvider = Tables<"hardware_providers">;

export const CreateQUBOtForm = () => {
  const session = useSession();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSolver, setSelectedSolver] = useState<{
    id: string;
    name: string;
    parameters: Record<string, any>;
  } | null>(null);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [selectedHardware, setSelectedHardware] = useState<HardwareProvider | null>(null);

  const { data: datasets, isLoading: datasetsLoading } = useQuery({
    queryKey: ['datasets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('datasets')
        .select('*, profiles(username)');
      
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user,
  });

  const { data: hardwareProviders, isLoading: hardwareLoading } = useQuery({
    queryKey: ['hardware-providers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hardware_providers')
        .select('*');
      
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user,
  });

  const handleCreateQubot = async () => {
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
          creator_id: session?.user?.id,
          solver_type: selectedSolver.id,
          solver_parameters: selectedSolver.parameters,
          is_public: true,
          input_parameters: [],
          cost_function: null,
          algorithm_logic: null
        });

      if (error) throw error;

      toast.success("QUBOt created successfully!");
      setName("");
      setDescription("");
      setSelectedSolver(null);
      setSelectedDataset(null);
      setSelectedHardware(null);
    } catch (error: any) {
      toast.error(`Failed to create QUBOt: ${error.message}`);
      console.error(error);
    }
  };

  if (!session?.user) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">Please log in to create QUBOts</p>
      </Card>
    );
  }

  if (datasetsLoading || hardwareLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p>Loading resources...</p>
        </div>
      </Card>
    );
  }

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

        <SolverSection
          selectedSolver={selectedSolver}
          onSelect={setSelectedSolver}
        />

        <DatasetSection
          datasets={datasets}
          selectedDataset={selectedDataset}
          onSelect={setSelectedDataset}
        />

        <HardwareSection
          hardwareProviders={hardwareProviders}
          selectedHardware={selectedHardware}
          onSelect={setSelectedHardware}
        />

        <Button onClick={handleCreateQubot} className="w-full">
          Create QUBOt
        </Button>
      </div>
    </Card>
  );
};