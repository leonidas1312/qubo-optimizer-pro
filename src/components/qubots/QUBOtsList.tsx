import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const QUBOtsList = () => {
  const { data: qubots, isLoading } = useQuery({
    queryKey: ['qubots'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('qubots')
        .select('*, profiles(username)')
        .eq('is_public', true);
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <Card className="p-8">
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="ml-2 text-muted-foreground">Loading QUBOts...</p>
        </div>
      </Card>
    );
  }

  if (!qubots?.length) {
    return (
      <Card className="p-8">
        <p className="text-center text-muted-foreground">
          No QUBOts found. Create one to get started!
        </p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {qubots.map((qubot) => (
        <Card key={qubot.id} className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{qubot.name}</h3>
            <p className="text-muted-foreground">{qubot.description}</p>
            <p className="text-sm text-muted-foreground">
              Created by {(qubot.profiles as any)?.username || 'Anonymous'}
            </p>
          </div>
          <Button variant="outline" className="w-full">View Details</Button>
        </Card>
      ))}
    </div>
  );
};