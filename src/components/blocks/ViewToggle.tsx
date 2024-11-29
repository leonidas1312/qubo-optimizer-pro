import { Button } from "@/components/ui/button";
import { Eye, Code } from "lucide-react";

interface ViewToggleProps {
  value: "visual" | "code";
  onChange: (value: "visual" | "code") => void;
}

export const ViewToggle = ({ value, onChange }: ViewToggleProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant={value === "visual" ? "default" : "outline"}
        size="sm"
        onClick={() => onChange("visual")}
      >
        <Eye className="mr-2 h-4 w-4" />
        Visual
      </Button>
      <Button
        variant={value === "code" ? "default" : "outline"}
        size="sm"
        onClick={() => onChange("code")}
      >
        <Code className="mr-2 h-4 w-4" />
        Code
      </Button>
    </div>
  );
};