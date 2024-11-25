import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Cpu, Server, HardDrive, AlertCircle } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { toast } from "sonner";

type HardwareProvider = Tables<"hardware_providers">;

const Hardware = () => {
  const { data: providers, isLoading, error } = useQuery({
    queryKey: ['hardware-providers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hardware_providers')
        .select('*');
      
      if (error) {
        toast.error("Failed to load hardware providers");
        throw error;
      }
      return data;
    }
  });

  const handleSelect = (provider: HardwareProvider) => {
    toast.success(`Selected ${provider.name} for computation`);
  };

  if (error) {
    return (
      <DashboardLayout>
        <div className="container mx-auto py-8 px-4">
          <Card className="p-8 text-center">
            <AlertCircle className="h-8 w-8 mx-auto text-destructive" />
            <p className="mt-2 text-muted-foreground">Failed to load hardware providers</p>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Computing Resources
            </h1>
            <p className="text-muted-foreground text-lg">
              Select hardware resources for running your QUBO optimization tasks. Each provider offers different specifications and pricing options.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6 animate-pulse">
                  <div className="h-24 bg-muted rounded" />
                </Card>
              ))}
            </div>
          ) : providers && providers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers.map((provider) => (
                <Card 
                  key={provider.id} 
                  className="p-6 hover:border-primary/50 transition-colors duration-300 hover:shadow-lg"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="text-xl font-semibold">{provider.name}</h3>
                        <p className="text-sm text-muted-foreground">{provider.description}</p>
                      </div>
                      {provider.provider_type === 'CPU' ? (
                        <Cpu className="h-6 w-6 text-blue-500" />
                      ) : provider.provider_type === 'GPU' ? (
                        <Server className="h-6 w-6 text-purple-500" />
                      ) : (
                        <HardDrive className="h-6 w-6 text-green-500" />
                      )}
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Specifications</h4>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(provider.specs as Record<string, string>).map(([key, value]) => (
                          <Badge key={key} variant="outline" className="bg-background">
                            {key}: {value}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-lg font-bold text-primary">
                        ${provider.cost_per_hour}/hour
                      </span>
                      <Button 
                        onClick={() => handleSelect(provider)}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      >
                        Select
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center gap-2">
                <AlertCircle className="h-8 w-8 text-muted-foreground" />
                <p className="text-muted-foreground">
                  No hardware providers available at the moment.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Hardware;