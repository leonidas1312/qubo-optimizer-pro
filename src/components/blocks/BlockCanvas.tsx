import { useCallback, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { ResultsChart } from "@/components/visualization/ResultsChart";

interface BlockCanvasProps {
  connections: any[];
  setConnections: (connections: any[]) => void;
}

export const BlockCanvas = ({ connections, setConnections }: BlockCanvasProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { user } = useAuth();

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const blockData = JSON.parse(e.dataTransfer.getData("application/json"));
      
      // Validate block type and prevent duplicates
      const existingType = connections.find(c => c.type === blockData.type);
      if (existingType) {
        toast.error(`Only one ${blockData.type} can be added`);
        return;
      }
      
      setConnections([...connections, blockData]);
    },
    [connections, setConnections]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const validateConnections = () => {
    const solver = connections.find(c => c.type === "solver");
    const dataset = connections.find(c => c.type === "dataset");
    const hardware = connections.find(c => c.type === "hardware");

    if (!solver || !dataset || !hardware) {
      toast.error("Please add a solver, dataset, and hardware to run the optimization");
      return false;
    }
    return true;
  };

  const handleRun = async () => {
    if (!validateConnections()) return;
    if (!user) {
      toast.error("Please log in to run optimizations");
      return;
    }

    setIsRunning(true);
    setResults(null);

    try {
      // Save the connection configuration
      const { data: blockConnection, error: saveError } = await supabase
        .from('block_connections')
        .insert({
          creator_id: user.id,
          name: "Optimization Run",
          solver_id: connections.find(c => c.type === "solver")?.id,
          dataset_id: connections.find(c => c.type === "dataset")?.id,
          hardware_id: connections.find(c => c.type === "hardware")?.id,
          configuration: { connections }
        })
        .select()
        .single();

      if (saveError) throw saveError;

      // Execute the optimization
      const response = await fetch('http://localhost:8000/api/solve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          solver: connections.find(c => c.type === "solver"),
          dataset: connections.find(c => c.type === "dataset"),
          hardware: connections.find(c => c.type === "hardware"),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to run optimization');
      }

      const data = await response.json();
      setResults(data);
      toast.success("Optimization completed successfully!");
    } catch (error) {
      console.error('Error running optimization:', error);
      toast.error("Failed to run optimization");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card
        className="flex-1 p-4 bg-secondary/50 min-h-[300px]"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="grid grid-cols-3 gap-4">
          {connections.map((block, index) => (
            <Card key={index} className="p-4 relative">
              <h3 className="font-medium">{block.name}</h3>
              <p className="text-sm text-muted-foreground">{block.type}</p>
            </Card>
          ))}
        </div>
      </Card>

      <Button
        onClick={handleRun}
        disabled={isRunning || connections.length < 3}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-800"
      >
        {isRunning ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Running Optimization...
          </>
        ) : (
          <>
            <Play className="mr-2 h-4 w-4" />
            Run Optimization
          </>
        )}
      </Button>

      {results && (
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Results</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Best Cost: {results.cost}</p>
              <p className="text-sm text-muted-foreground">
                Time taken: {results.time.toFixed(2)}s
              </p>
            </div>
            {results.iterations_cost && (
              <ResultsChart data={results.iterations_cost} />
            )}
          </div>
        </Card>
      )}
    </div>
  );
};