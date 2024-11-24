import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Cpu, Server, HardDrive } from "lucide-react";

const Hardware = () => {
  const { data: providers, isLoading } = useQuery({
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
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold gradient-text">Computing Resources</h1>
            <p className="text-muted-foreground mt-2">
              Select hardware resources for running your QUBO optimization tasks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <Card className="p-8">
                <p className="text-center text-muted-foreground">Loading available hardware...</p>
              </Card>
            ) : providers?.map((provider) => (
              <Card key={provider.id} className="p-6 hover:border-primary/50 transition-colors">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold">{provider.name}</h3>
                      <p className="text-sm text-muted-foreground">{provider.description}</p>
                    </div>
                    {provider.provider_type === 'CPU' ? (
                      <Cpu className="h-6 w-6" />
                    ) : provider.provider_type === 'GPU' ? (
                      <Server className="h-6 w-6" />
                    ) : (
                      <HardDrive className="h-6 w-6" />
                    )}
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Specifications</h4>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(provider.specs).map(([key, value]) => (
                        <Badge key={key} variant="outline">
                          {key}: {value}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">
                      ${provider.cost_per_hour}/hour
                    </span>
                    <Button>Select</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Hardware;