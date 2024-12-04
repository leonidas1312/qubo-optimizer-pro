import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database, FileJson, AlertCircle, Download } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

type Dataset = Tables<"datasets">;

const Datasets = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      toast.error("Please log in to view datasets");
    }
  }, [isAuthenticated, navigate]);

  const { data: datasets, isLoading, error } = useQuery({
    queryKey: ['datasets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('datasets')
        .select('*, profiles(username)');
      
      if (error) {
        console.error('Error fetching datasets:', error);
        throw error;
      }
      return data;
    },
    enabled: !!user,
  });

  const handleDownload = (dataset: Dataset) => {
    if (!dataset.file_path) {
      toast.error("Download link not available");
      return;
    }
    toast.success(`Downloading ${dataset.name}`);
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "Unknown size";
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  if (!isAuthenticated) {
    return null;
  }

  if (error) {
    return (
      <div className="w-full">
        <Card className="p-8 text-center">
          <AlertCircle className="h-8 w-8 mx-auto text-destructive" />
          <p className="mt-2 text-muted-foreground">Failed to load datasets</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            QUBO Datasets
          </h1>
          <p className="text-muted-foreground text-lg">
            Browse and download curated datasets for QUBO optimization problems. These datasets are designed to help you test and benchmark your solvers.
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
        ) : datasets && datasets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {datasets.map((dataset) => (
              <Card 
                key={dataset.id} 
                className="p-6 hover:border-primary/50 transition-colors duration-300 hover:shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold">{dataset.name}</h3>
                      <p className="text-sm text-muted-foreground">{dataset.description}</p>
                    </div>
                    {dataset.format === 'json' ? (
                      <FileJson className="h-6 w-6 text-yellow-500" />
                    ) : (
                      <Database className="h-6 w-6 text-blue-500" />
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-background">
                      Format: {dataset.format}
                    </Badge>
                    <Badge variant="outline" className="bg-background">
                      Size: {formatFileSize(dataset.size)}
                    </Badge>
                    <Badge variant="outline" className="bg-background">
                      Added {formatDistanceToNow(new Date(dataset.created_at), { addSuffix: true })}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-muted-foreground">
                      By {(dataset.profiles as any)?.username || "Anonymous"}
                    </span>
                    <Button 
                      onClick={() => handleDownload(dataset)}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
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
                No datasets available at the moment.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Datasets;