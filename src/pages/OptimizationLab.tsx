import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Github } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const OptimizationLab = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { data: solvers } = useQuery({
    queryKey: ['solvers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('solvers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (!isAuthenticated) {
    return (
      <DashboardLayout>
        <div className="container mx-auto py-8 px-4">
          <Card className="p-8 text-center space-y-4">
            <Github className="w-12 h-12 mx-auto text-muted-foreground" />
            <h1 className="text-2xl font-bold">GitHub Authentication Required</h1>
            <p className="text-muted-foreground">
              Please login with GitHub to create and manage your optimization solvers.
            </p>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold gradient-text">Optimization Lab</h1>
            <p className="text-muted-foreground mt-2">
              Create and manage your custom optimization solvers
            </p>
          </div>
          <Button 
            onClick={() => navigate('/upload-solver')}
            className="bg-gradient-to-r from-blue-600 to-blue-800"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Solver
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solvers?.map((solver) => (
            <Card key={solver.id} className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">{solver.name}</h3>
              <p className="text-muted-foreground">{solver.description}</p>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate(`/solver/${solver.id}`)}
                >
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OptimizationLab;