import { useCallback, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface BlockCanvasProps {
  connections: any[];
  setConnections: (connections: any[]) => void;
}

export const BlockCanvas = ({ connections, setConnections }: BlockCanvasProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

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
      toast.error("Please add a solver, dataset, and hardware to submit a job");
      return false;
    }
    return true;
  };

  const handleSubmitJob = async () => {
    if (!validateConnections()) return;
    if (!user) {
      toast.error("Please log in to submit jobs");
      return;
    }

    setIsSubmitting(true);

    try {
      const solver = connections.find(c => c.type === "solver");
      const dataset = connections.find(c => c.type === "dataset");
      const hardware = connections.find(c => c.type === "hardware");

      const response = await fetch('/api/create-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          solver,
          dataset,
          hardware,
          userId: user.id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create job');
      }

      const { job } = await response.json();
      
      toast.success("Job submitted successfully!");
      navigate('/jobs'); // Redirect to jobs page
      
    } catch (error) {
      console.error('Error submitting job:', error);
      toast.error("Failed to submit job");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
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
        onClick={handleSubmitJob}
        disabled={isSubmitting || connections.length < 3}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:opacity-90 transition-opacity h-12"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting Job...
          </>
        ) : (
          <>
            <Play className="mr-2 h-4 w-4" />
            Submit Job
          </>
        )}
      </Button>
    </div>
  );
};