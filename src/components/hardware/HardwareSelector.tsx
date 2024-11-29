import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { HardwareBlock } from "./HardwareBlock";
import { Card } from "@/components/ui/card";
import { Tables } from "@/integrations/supabase/types";
import { toast } from "sonner";

type HardwareProvider = Tables<"hardware_providers">;

interface HardwareSelectorProps {
  selectedProvider?: HardwareProvider;
  onSelect: (provider: HardwareProvider) => void;
}

export const HardwareSelector = ({ selectedProvider, onSelect }: HardwareSelectorProps) => {
  const { data: providers, isLoading, error } = useQuery({
    queryKey: ['hardware-providers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hardware_providers')
        .select('*')
        .eq('availability', true)
        .order('cost_per_hour', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4 h-32 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    toast.error("Failed to load hardware providers");
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {providers?.map((provider) => (
        <HardwareBlock
          key={provider.id}
          provider={provider}
          isSelected={selectedProvider?.id === provider.id}
          onClick={() => onSelect(provider)}
        />
      ))}
    </div>
  );
};