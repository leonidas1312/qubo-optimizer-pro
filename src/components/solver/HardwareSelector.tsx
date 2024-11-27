import { Card } from "@/components/ui/card";
import { Server } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface HardwareSelectorProps {
  selectedHardware: any;
  onSelect: (hardware: any) => void;
}

export const HardwareSelector = ({ selectedHardware, onSelect }: HardwareSelectorProps) => {
  const { data: hardwareProviders } = useQuery({
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

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Select Hardware</h3>
      <div className="grid grid-cols-2 gap-4">
        {hardwareProviders?.map((provider) => (
          <Card
            key={provider.id}
            className={`p-4 hover:bg-accent cursor-pointer transition-colors ${
              selectedHardware?.id === provider.id ? 'border-2 border-primary' : ''
            }`}
            onClick={() => onSelect(provider)}
          >
            <div className="flex items-center gap-3">
              <Server className="h-6 w-6" />
              <div>
                <h4 className="font-medium">{provider.name}</h4>
                <p className="text-sm text-muted-foreground">{provider.description}</p>
                <p className="text-sm font-medium mt-2">${provider.cost_per_hour}/hour</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};