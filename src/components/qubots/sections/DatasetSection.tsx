import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { FileJson, Database } from "lucide-react";
import { toast } from "sonner";
import { Tables } from "@/integrations/supabase/types";

type Dataset = Tables<"datasets">;

interface DatasetSectionProps {
  datasets: Dataset[] | undefined;
  selectedDataset: Dataset | null;
  onSelect: (dataset: Dataset) => void;
}

export const DatasetSection = ({ datasets, selectedDataset, onSelect }: DatasetSectionProps) => {
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
    <div className="space-y-4">
      <Label>Select a Dataset</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {datasets?.map((dataset) => (
          <Card
            key={dataset.id}
            className={`p-4 hover:bg-accent cursor-pointer transition-colors ${
              selectedDataset?.id === dataset.id ? 'border-2 border-primary' : ''
            }`}
            onClick={() => {
              onSelect(dataset);
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
  );
};