import { Card } from "@/components/ui/card";
import { MatrixUpload } from "@/components/upload/MatrixUpload";
import { Database } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface DatasetSelectorProps {
  selectedDataset: any;
  onSelect: (dataset: any) => void;
}

export const DatasetSelector = ({ selectedDataset, onSelect }: DatasetSelectorProps) => {
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

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Select Dataset</h3>
      <div className="grid grid-cols-2 gap-4">
        {datasets?.map((dataset) => (
          <Card
            key={dataset.id}
            className={`p-4 hover:bg-accent cursor-pointer transition-colors ${
              selectedDataset?.id === dataset.id ? 'border-2 border-primary' : ''
            }`}
            onClick={() => onSelect(dataset)}
          >
            <div className="flex items-center gap-3">
              <Database className="h-6 w-6" />
              <div>
                <h4 className="font-medium">{dataset.name}</h4>
                <p className="text-sm text-muted-foreground">{dataset.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <MatrixUpload onMatrixLoaded={() => {}} />
    </div>
  );
};