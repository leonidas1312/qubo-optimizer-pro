import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Code2, User, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";

const Solvers = () => {
  const { data: solvers, isLoading } = useQuery({
    queryKey: ['public-solvers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('solvers')
        .select(`
          *,
          profiles:creator_id (
            username,
            avatar_url
          )
        `)
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (error) {
        toast.error("Failed to fetch solvers");
        throw error;
      }

      return data;
    }
  });

  const handleDownload = async (solver: any) => {
    try {
      // If there's a download URL, use it
      if (solver.download_url) {
        window.open(solver.download_url, '_blank');
        return;
      }

      // Otherwise, download the code content directly
      const blob = new Blob([solver.code_content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${solver.name.toLowerCase().replace(/\s+/g, '-')}.py`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success(`Downloaded ${solver.name}`);
    } catch (error) {
      console.error('Download error:', error);
      toast.error("Failed to download solver");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Community Solvers</h1>
        <p className="text-muted-foreground mt-2">
          Explore and download QUBO solvers created by the community
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solvers?.map((solver) => (
            <Card key={solver.id} className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{solver.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {solver.description || "No description provided"}
                  </p>
                </div>
                <Badge variant="outline" className="ml-2">
                  {solver.solver_type}
                </Badge>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{solver.profiles?.username || "Anonymous"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{format(new Date(solver.created_at), 'PPP')}</span>
                </div>
              </div>

              <div className="pt-4 flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => toast.info("Solver details coming soon!")}
                >
                  <Code2 className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button 
                  variant="default"
                  className="flex-1"
                  onClick={() => handleDownload(solver)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Solvers;
