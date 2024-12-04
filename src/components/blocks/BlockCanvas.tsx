import { useCallback, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Loader2, X } from "lucide-react";
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
      
      const existingType = connections.find(c => c.type === blockData.type);
      if (existingType) {
        toast.error(`Only one ${blockData.type} can be added`);
        return;
      }
      
      setConnections([...connections, blockData]);
      toast.success(`Added ${blockData.name}`);
    },
    [connections, setConnections]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('ring-2', 'ring-primary', 'ring-opacity-50');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('ring-2', 'ring-primary', 'ring-opacity-50');
  };

  const handleRemoveBlock = (index: number) => {
    const newConnections = [...connections];
    newConnections.splice(index, 1);
    setConnections(newConnections);
    toast.success("Block removed");
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

      const response = await fetch('/api/solve', {
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
      
      const hardware = connections.find(c => c.type === "hardware");
      const executionTimeHours = data.time / 3600;
      const cost = executionTimeHours * hardware.cost_per_hour;
      
      setResults({
        ...data,
        cost: cost.toFixed(2)
      });
      
      toast.success("Optimization completed successfully!");
    } catch (error) {
      console.error('Error running optimization:', error);
      toast.error("Failed to run optimization");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-6 flex-1">
      <Card
        className="flex-1 p-6 bg-black/20 backdrop-blur-sm border-white/10 min-h-[300px] transition-all duration-300"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {connections.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            Drag and drop blocks here to create your optimization workflow
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {connections.map((block, index) => (
              <Card 
                key={index} 
                className="p-4 relative bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-colors group"
              >
                <button
                  onClick={() => handleRemoveBlock(index)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-white" />
                </button>
                <h3 className="font-medium">{block.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{block.type}</p>
                {block.type === 'hardware' && (
                  <p className="text-xs text-green-400 mt-2">${block.cost_per_hour}/hr</p>
                )}
              </Card>
            ))}
          </div>
        )}
      </Card>

      <Button
        onClick={handleRun}
        disabled={isRunning || connections.length < 3}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:opacity-90 transition-opacity h-12"
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
        <Card className="p-6 bg-black/20 backdrop-blur-sm border-white/10 animate-fade-in">
          <h3 className="text-lg font-semibold mb-6">Results</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Best Cost</p>
                <p className="text-2xl font-bold">{results.cost}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Execution Cost</p>
                <p className="text-2xl font-bold text-green-400">${results.cost}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Time Taken</p>
                <p className="text-2xl font-bold">{results.time.toFixed(2)}s</p>
              </div>
            </div>
            
            {results.iterations_cost && (
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-4">Optimization Progress</h4>
                <ResultsChart data={results.iterations_cost} />
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};