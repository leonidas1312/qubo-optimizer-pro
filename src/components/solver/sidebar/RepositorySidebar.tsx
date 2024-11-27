import { useState } from "react";
import { FileTree } from "@/components/github/FileTree";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RepositoryCombobox } from "@/components/github/RepositoryCombobox";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Repository {
  owner: string;
  name: string;
}

interface RepositorySidebarProps {
  files: any[];
  onFileSelect: (path: string, repo?: Repository) => void;
  className?: string;
  selectedFile: string | null;
}

export const RepositorySidebar = ({ files, onFileSelect, className, selectedFile }: RepositorySidebarProps) => {
  const [selectedRepo, setSelectedRepo] = useState<any>(null);
  const [fileStructure, setFileStructure] = useState<any[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSelectRepository = async (repo: any) => {
    try {
      const [owner, repoName] = repo.full_name.split('/');
      setSelectedRepo({ owner, name: repoName, full_name: repo.full_name });
      
      const response = await fetch(
        `http://localhost:8000/api/github/repos/${owner}/${repoName}/tree`,
        { credentials: 'include' }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch repository structure');
      }
      
      const structure = await response.json();
      setFileStructure(structure);
      toast.success('Repository files loaded successfully');
    } catch (error) {
      toast.error('Failed to load repository files');
      console.error('Error fetching repository structure:', error);
    }
  };

  const handleFileSelect = async (path: string) => {
    onFileSelect(path, selectedRepo);
    setIsCollapsed(true);
  };

  return (
    <div className={cn(
      "relative transition-all duration-300 ease-in-out border-r border-white/10",
      isCollapsed ? "w-12" : "w-80",
      className
    )}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-4 z-50"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      <div className={cn(
        "transition-opacity duration-300",
        isCollapsed ? "opacity-0 invisible" : "opacity-100 visible"
      )}>
        <div className="p-4 border-b border-white/10">
          <h3 className="text-sm font-medium text-white/80 mb-4">Select Repository</h3>
          <RepositoryCombobox
            repositories={files}
            onSelectRepository={handleSelectRepository}
          />
        </div>
        <ScrollArea className="h-[calc(100vh-5rem)]">
          <div className="p-2">
            <FileTree files={fileStructure} onFileSelect={handleFileSelect} />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};