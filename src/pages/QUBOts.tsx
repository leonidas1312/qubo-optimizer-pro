import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SolverTemplatesSection } from "@/components/qubots/SolverTemplatesSection";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const QUBOts = () => {
  const { data: qubots, isLoading } = useQuery({
    queryKey: ['qubots'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('qubots')
        .select('*')
        .eq('is_public', true);
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4 space-y-8">
        <div>
          <h1 className="text-4xl font-bold gradient-text">QUBOt Solvers</h1>
          <p className="text-muted-foreground mt-2">
            Explore and download pre-built solver templates or browse community-created QUBOts
          </p>
        </div>

        <Tabs defaultValue="templates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="templates">Solver Templates</TabsTrigger>
            <TabsTrigger value="community">Community QUBOts</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-6">
            <SolverTemplatesSection />
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            {isLoading ? (
              <Card className="p-8">
                <p className="text-center text-muted-foreground">Loading community QUBOts...</p>
              </Card>
            ) : qubots?.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {qubots.map((qubot) => (
                  <Card key={qubot.id} className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold">{qubot.name}</h3>
                    <p className="text-muted-foreground">{qubot.description}</p>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8">
                <p className="text-center text-muted-foreground">
                  No community QUBOts found. Be the first to create one!
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default QUBOts;