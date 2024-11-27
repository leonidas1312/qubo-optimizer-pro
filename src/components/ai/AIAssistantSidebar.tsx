import { Repository } from "./types";
import { FileTree } from "@/components/github/FileTree";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface AIAssistantSidebarProps {
  onFileSelect: (path: string, repo: Repository) => void;
  isCollapsed: boolean;
  fileStructure: any[];
}

export const AIAssistantSidebar = ({ 
  onFileSelect, 
  isCollapsed,
  fileStructure 
}: AIAssistantSidebarProps) => {
  const handleFileSelect = (path: string) => {
    onFileSelect(path);
  };

  return (
    <div className={cn(
      "transition-all duration-300 ease-in-out border-r border-white/10",
      isCollapsed ? "w-0 opacity-0" : "w-80 opacity-100"
    )}>
      <div className="h-full p-4">
        <div className="mt-4 h-[calc(100vh-8rem)]">
          <ScrollArea className="h-full rounded-md border">
            <FileTree files={fileStructure} onFileSelect={handleFileSelect} />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};