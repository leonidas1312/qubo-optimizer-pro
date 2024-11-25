import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Cpu, Server, HardDrive } from "lucide-react";
import { toast } from "sonner";
import { Tables } from "@/integrations/supabase/types";

type HardwareProvider = Tables<"hardware_providers">;

interface HardwareSectionProps {
  hardwareProviders: HardwareProvider[] | undefined;
  selectedHardware: HardwareProvider | null;
  onSelect: (hardware: HardwareProvider) => void;
}

export const HardwareSection = ({ 
  hardwareProviders, 
  selectedHardware, 
  onSelect 
}: HardwareSectionProps) => {
  return (
    <div className="space-y-4">
      <Label>Select Hardware</Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hardwareProviders?.map((provider) => (
          <Card
            key={provider.id}
            className={`p-4 hover:bg-accent cursor-pointer transition-colors ${
              selectedHardware?.id === provider.id ? 'border-2 border-primary' : ''
            }`}
            onClick={() => {
              onSelect(provider);
              toast.success(`Selected hardware: ${provider.name}`);
            }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                {provider.provider_type === 'CPU' ? (
                  <Cpu className="h-6 w-6 text-blue-500" />
                ) : provider.provider_type === 'GPU' ? (
                  <Server className="h-6 w-6 text-purple-500" />
                ) : (
                  <HardDrive className="h-6 w-6 text-green-500" />
                )}
              </div>
              <div>
                <h4 className="font-medium">{provider.name}</h4>
                <p className="text-sm text-muted-foreground">{provider.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {Object.entries(provider.specs as Record<string, string>).map(([key, value]) => (
                    <Badge key={key} variant="outline" className="bg-background">
                      {key}: {value}
                    </Badge>
                  ))}
                  <Badge variant="outline" className="bg-background text-primary font-semibold">
                    ${provider.cost_per_hour}/hour
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