import { FileTree } from "@/components/github/FileTree";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RepositorySidebarProps {
  files: any[];
  onFileSelect: (path: string) => void;
}

export const RepositorySidebar = ({ files, onFileSelect }: RepositorySidebarProps) => {
  return (
    <div className="w-80 h-full border-r border-white/10 bg-black/50">
      <div className="p-4 border-b border-white/10">
        <h3 className="text-sm font-medium text-white/80">Repository Files</h3>
      </div>
      <ScrollArea className="h-[calc(100%-57px)]">
        <div className="p-2">
          <FileTree files={files} onFileSelect={onFileSelect} />
        </div>
      </ScrollArea>
    </div>
  );
};