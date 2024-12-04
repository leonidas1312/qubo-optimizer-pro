import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Beaker, Database, Cpu } from "lucide-react";

export const BlockPalette = () => {
  const { data: solvers } = useQuery({
    queryKey: ["solvers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("solvers")
        .select("*")
        .eq("is_public", true);
      if (error) throw error;
      return data;
    },
  });

  const { data: datasets } = useQuery({
    queryKey: ["datasets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("datasets")
        .select("*")
        .eq("is_public", true);
      if (error) throw error;
      return data;
    },
  });

  const { data: hardware } = useQuery({
    queryKey: ["hardware"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hardware_providers")
        .select("*")
        .eq("availability", true);
      if (error) throw error;
      return data;
    },
  });

  const handleDragStart = (e: React.DragEvent, block: any) => {
    e.dataTransfer.setData("application/json", JSON.stringify(block));
  };

  return (
    <Card className="w-72 p-6 bg-black/20 backdrop-blur-sm border-white/10">
      <ScrollArea className="h-[calc(100vh-16rem)]">
        <div className="space-y-8">
          <section>
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Beaker className="h-4 w-4 text-purple-400" />
              Solvers
            </h3>
            <div className="space-y-2">
              {solvers?.map((solver) => (
                <Card
                  key={solver.id}
                  className="p-3 cursor-move hover:bg-white/5 transition-colors border-white/10"
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, { ...solver, type: "solver" })
                  }
                >
                  <p className="font-medium text-sm">{solver.name}</p>
                  {solver.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {solver.description}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Database className="h-4 w-4 text-blue-400" />
              Datasets
            </h3>
            <div className="space-y-2">
              {datasets?.map((dataset) => (
                <Card
                  key={dataset.id}
                  className="p-3 cursor-move hover:bg-white/5 transition-colors border-white/10"
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, { ...dataset, type: "dataset" })
                  }
                >
                  <p className="font-medium text-sm">{dataset.name}</p>
                  {dataset.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {dataset.description}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Cpu className="h-4 w-4 text-green-400" />
              Hardware
            </h3>
            <div className="space-y-2">
              {hardware?.map((hw) => (
                <Card
                  key={hw.id}
                  className="p-3 cursor-move hover:bg-white/5 transition-colors border-white/10"
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, { ...hw, type: "hardware" })
                  }
                >
                  <p className="font-medium text-sm">{hw.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground">
                      {hw.provider_type}
                    </p>
                    <p className="text-xs font-medium text-green-400">
                      ${hw.cost_per_hour}/hr
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </ScrollArea>
    </Card>
  );
};