import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { solverTemplates } from "@/utils/solverTemplates";
import { toast } from "sonner";

interface DefaultSolversProps {
  onSelect: (solver: {
    id: string;
    name: string;
    parameters: Record<string, any>;
  }) => void;
}

export const DefaultSolvers = ({ onSelect }: DefaultSolversProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {solverTemplates.map((template) => {
        const Icon = template.icon;
        return (
          <Card 
            key={template.id}
            className="p-4 hover:bg-accent cursor-pointer transition-colors"
            onClick={() => {
              onSelect({
                id: template.id,
                name: template.name,
                parameters: template.parameters
              });
              toast.success(`Selected ${template.name} solver`);
            }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-medium">{template.name}</h4>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>
            </div>
          </Card>
        ))}
    </div>
  );
};