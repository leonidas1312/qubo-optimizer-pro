import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BlockCanvas } from "./BlockCanvas";
import { BlockPalette } from "./BlockPalette";
import { CodePreview } from "./CodePreview";
import { ViewToggle } from "./ViewToggle";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const BlockEditor = () => {
  const [viewMode, setViewMode] = useState<"visual" | "code">("visual");
  const [selectedBlocks, setSelectedBlocks] = useState({
    solver: null,
    dataset: null,
    hardware: null
  });

  const { data: solvers } = useQuery({
    queryKey: ['solvers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('solvers')
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

  const handleSaveConnection = async () => {
    try {
      const { error } = await supabase
        .from('block_connections')
        .insert({
          solver_id: selectedBlocks.solver?.id,
          dataset_id: selectedBlocks.dataset?.id,
          hardware_id: selectedBlocks.hardware?.id,
          name: "New Connection",
          configuration: {}
        });

      if (error) throw error;
      toast.success("Connection saved successfully!");
    } catch (error) {
      toast.error("Failed to save connection");
      console.error(error);
    }
  };

  return (
    <div className="h-full flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Block Editor</h2>
        <ViewToggle value={viewMode} onChange={setViewMode} />
      </div>

      <div className="flex-1 flex gap-4">
        <Card className="w-64 p-4">
          <BlockPalette
            solvers={solvers || []}
            datasets={datasets || []}
            hardware={hardware || []}
            onSelectBlock={(type, block) => {
              setSelectedBlocks(prev => ({
                ...prev,
                [type]: block
              }));
            }}
          />
        </Card>

        <Card className="flex-1 p-4">
          {viewMode === "visual" ? (
            <BlockCanvas
              selectedBlocks={selectedBlocks}
              onUpdateConnections={(connections) => {
                console.log("Connections updated:", connections);
              }}
            />
          ) : (
            <CodePreview
              solver={selectedBlocks.solver}
              dataset={selectedBlocks.dataset}
              hardware={selectedBlocks.hardware}
            />
          )}
        </Card>
      </div>

      <Button 
        onClick={handleSaveConnection}
        disabled={!selectedBlocks.solver || !selectedBlocks.dataset || !selectedBlocks.hardware}
        className="ml-auto"
      >
        Save Connection
      </Button>
    </div>
  );
};