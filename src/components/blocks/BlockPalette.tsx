import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Cpu, Database, Cog } from "lucide-react";

interface BlockPaletteProps {
  solvers: any[];
  datasets: any[];
  hardware: any[];
  onSelectBlock: (type: string, block: any) => void;
}

export const BlockPalette = ({
  solvers,
  datasets,
  hardware,
  onSelectBlock
}: BlockPaletteProps) => {
  return (
    <ScrollArea className="h-[600px]">
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Solvers</h3>
          <div className="space-y-2">
            {solvers.map((solver) => (
              <Button
                key={solver.id}
                variant="outline"
                className="w-full justify-start"
                onClick={() => onSelectBlock('solver', solver)}
              >
                <Cog className="mr-2 h-4 w-4" />
                {solver.name}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Datasets</h3>
          <div className="space-y-2">
            {datasets.map((dataset) => (
              <Button
                key={dataset.id}
                variant="outline"
                className="w-full justify-start"
                onClick={() => onSelectBlock('dataset', dataset)}
              >
                <Database className="mr-2 h-4 w-4" />
                {dataset.name}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Hardware</h3>
          <div className="space-y-2">
            {hardware.map((hw) => (
              <Button
                key={hw.id}
                variant="outline"
                className="w-full justify-start"
                onClick={() => onSelectBlock('hardware', hw)}
              >
                <Cpu className="mr-2 h-4 w-4" />
                {hw.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};