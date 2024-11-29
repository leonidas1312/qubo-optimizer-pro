import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
    <Card className="w-64 p-4">
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="space-y-6">
          <section>
            <h3 className="font-medium mb-2">Solvers</h3>
            <div className="space-y-2">
              {solvers?.map((solver) => (
                <Card
                  key={solver.id}
                  className="p-2 cursor-move"
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, { ...solver, type: "solver" })
                  }
                >
                  {solver.name}
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-medium mb-2">Datasets</h3>
            <div className="space-y-2">
              {datasets?.map((dataset) => (
                <Card
                  key={dataset.id}
                  className="p-2 cursor-move"
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, { ...dataset, type: "dataset" })
                  }
                >
                  {dataset.name}
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-medium mb-2">Hardware</h3>
            <div className="space-y-2">
              {hardware?.map((hw) => (
                <Card
                  key={hw.id}
                  className="p-2 cursor-move"
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, { ...hw, type: "hardware" })
                  }
                >
                  <div>
                    <div className="font-medium">{hw.name}</div>
                    <div className="text-xs text-muted-foreground">
                      ${hw.cost_per_hour}/hour
                    </div>
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