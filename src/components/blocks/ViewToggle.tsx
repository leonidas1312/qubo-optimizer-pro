import { Button } from "@/components/ui/button";
import { Code2, Blocks } from "lucide-react";

interface ViewToggleProps {
  currentView: "visual" | "code";
  onViewChange: (view: "visual" | "code") => void;
}

export const ViewToggle = ({ currentView, onViewChange }: ViewToggleProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant={currentView === "visual" ? "default" : "outline"}
        onClick={() => onViewChange("visual")}
        className={`${
          currentView === "visual"
            ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:opacity-90"
            : "hover:bg-white/5"
        } transition-all duration-300`}
      >
        <Blocks className="h-4 w-4 mr-2" />
        Visual Editor
      </Button>
      <Button
        variant={currentView === "code" ? "default" : "outline"}
        onClick={() => onViewChange("code")}
        className={`${
          currentView === "code"
            ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:opacity-90"
            : "hover:bg-white/5"
        } transition-all duration-300`}
      >
        <Code2 className="h-4 w-4 mr-2" />
        Code View
      </Button>
    </div>
  );
};