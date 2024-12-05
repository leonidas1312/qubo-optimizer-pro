import { useAuth } from "@/context/AuthContext";
import { BlockPalette } from "@/components/blocks/BlockPalette";
import { BlockCanvas } from "@/components/blocks/BlockCanvas";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [connections, setConnections] = useState<any[]>([]);

  if (!user) {
    navigate('/login');
    toast.error("Please log in to access the dashboard");
    return null;
  }

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Welcome to CEPTUM
        </h1>
        <p className="text-lg text-muted-foreground">
          Connect your solvers, datasets, and hardware to start optimizing QUBO problems.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <BlockPalette />
        </div>
        
        <div className="col-span-9">
          <BlockCanvas 
            connections={connections} 
            setConnections={setConnections}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;