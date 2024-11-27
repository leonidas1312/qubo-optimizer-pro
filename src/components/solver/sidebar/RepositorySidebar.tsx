import { useState } from "react";
import { FileTree } from "@/components/github/FileTree";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RepositoryCombobox } from "@/components/github/RepositoryCombobox";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface RepositorySidebarProps {
  files: any[];
  onFileSelect: (path: string) => void;
  className?: string;
}

export const RepositorySidebar = ({ files, onFileSelect, className }: RepositorySidebarProps) => {
  const [selectedRepo, setSelectedRepo] = useState<any>(null);
  const [fileStructure, setFileStructure] = useState<any[]>([]);

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

  return (
    <div className={cn("h-full bg-black/50 backdrop-blur-sm", className)}>
      <div className="p-4 border-b border-white/10">
        <h3 className="text-sm font-medium text-white/80 mb-4">Select Repository</h3>
        <RepositoryCombobox
          repositories={files}
          onSelectRepository={handleSelectRepository}
        />
      </div>
      <ScrollArea className="h-[calc(100%-5rem)]">
        <div className="p-2">
          <FileTree files={fileStructure} onFileSelect={onFileSelect} />
        </div>
      </ScrollArea>
    </div>
  );
};