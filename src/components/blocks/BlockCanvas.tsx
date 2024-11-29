import { useCallback } from "react";
import { Card } from "@/components/ui/card";

interface BlockCanvasProps {
  connections: any[];
  setConnections: (connections: any[]) => void;
}

export const BlockCanvas = ({ connections, setConnections }: BlockCanvasProps) => {
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const blockData = JSON.parse(e.dataTransfer.getData("application/json"));
      setConnections([...connections, blockData]);
    },
    [connections, setConnections]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <Card
      className="flex-1 p-4 bg-secondary/50"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="grid grid-cols-3 gap-4">
        {connections.map((block, index) => (
          <Card key={index} className="p-4">
            <h3 className="font-medium">{block.name}</h3>
            <p className="text-sm text-muted-foreground">{block.type}</p>
          </Card>
        ))}
      </div>
    </Card>
  );
};