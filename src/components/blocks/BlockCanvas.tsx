import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

interface BlockCanvasProps {
  selectedBlocks: {
    solver: any;
    dataset: any;
    hardware: any;
  };
  onUpdateConnections: (connections: any) => void;
}

export const BlockCanvas = ({ selectedBlocks, onUpdateConnections }: BlockCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    // Here we could add a visualization library like react-flow
    // For now, we'll use a simple flex layout
  }, [selectedBlocks]);

  return (
    <div ref={canvasRef} className="h-full flex items-center justify-center gap-8">
      {selectedBlocks.solver && (
        <Card className="p-4 bg-blue-500/10 border-blue-500">
          <h3 className="font-medium">{selectedBlocks.solver.name}</h3>
          <p className="text-sm text-muted-foreground">Solver</p>
        </Card>
      )}
      
      {selectedBlocks.dataset && (
        <Card className="p-4 bg-green-500/10 border-green-500">
          <h3 className="font-medium">{selectedBlocks.dataset.name}</h3>
          <p className="text-sm text-muted-foreground">Dataset</p>
        </Card>
      )}
      
      {selectedBlocks.hardware && (
        <Card className="p-4 bg-purple-500/10 border-purple-500">
          <h3 className="font-medium">{selectedBlocks.hardware.name}</h3>
          <p className="text-sm text-muted-foreground">Hardware</p>
        </Card>
      )}
    </div>
  );
};