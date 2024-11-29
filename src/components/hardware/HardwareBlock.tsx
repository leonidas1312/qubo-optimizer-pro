import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Cpu } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { formatCurrency } from "@/utils/format";

type HardwareProvider = Tables<"hardware_providers">;

interface HardwareBlockProps {
  provider: HardwareProvider;
  isSelected?: boolean;
  onClick?: () => void;
}

export const HardwareBlock = ({ provider, isSelected, onClick }: HardwareBlockProps) => {
  return (
    <Card
      className={`p-4 cursor-pointer transition-all hover:shadow-md ${
        isSelected ? "border-2 border-primary" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          {provider.provider_type === "GPU" ? (
            <Server className="h-6 w-6 text-purple-500" />
          ) : (
            <Cpu className="h-6 w-6 text-blue-500" />
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium">{provider.name}</h3>
          <p className="text-sm text-muted-foreground">{provider.description}</p>
          
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="outline">
              {provider.cloud_provider}
            </Badge>
            <Badge variant="outline">
              {provider.instance_type}
            </Badge>
            <Badge variant="outline" className="bg-green-50">
              {formatCurrency(provider.cost_per_hour)}/hour
            </Badge>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            {Object.entries(provider.specs as Record<string, string>).map(([key, value]) => (
              <div key={key} className="text-xs text-muted-foreground">
                <span className="font-medium capitalize">{key.replace('_', ' ')}</span>: {value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};