import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DefaultSolvers } from "./DefaultSolvers";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export const CreateQUBOtForm = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSolver, setSelectedSolver] = useState<{
    id: string;
    name: string;
    parameters: Record<string, any>;
  } | null>(null);

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
    } catch (error) {
      toast.error("Failed to create QUBOt");
      console.error(error);
    }
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

        <Button onClick={handleCreateQubot} className="w-full">
          Create QUBOt
        </Button>
      </div>
    </Card>
  );
};