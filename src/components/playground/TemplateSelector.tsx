import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { templates, ProblemTemplate } from "@/utils/problemTemplates";
import { useToast } from "@/components/ui/use-toast";

interface TemplateSelectorProps {
  onTemplateSelect: (template: ProblemTemplate) => void;
}

export const TemplateSelector = ({ onTemplateSelect }: TemplateSelectorProps) => {
  const { toast } = useToast();

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      onTemplateSelect(template);
      toast({
        title: "Template loaded",
        description: `Loaded ${template.name} template successfully.`,
      });
    }
  };

  return (
    <Card className="mb-8">
      <div className="flex items-center gap-4 p-6">
        <Select onValueChange={handleTemplateSelect}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select template" />
          </SelectTrigger>
          <SelectContent>
            {templates.map((template) => (
              <SelectItem key={template.id} value={template.id}>
                {template.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          Load a predefined optimization problem template
        </p>
      </div>
    </Card>
  );
};