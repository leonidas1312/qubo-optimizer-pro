import { Repository } from "./types";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RepositoryCombobox } from "@/components/github/RepositoryCombobox";
import { toast } from "sonner";
import { FileTree } from "@/components/github/FileTree";

interface AIAssistantSidebarProps {
  onFileSelect: (path: string, repo: Repository) => void;
}

export const AIAssistantSidebar = ({ onFileSelect }: AIAssistantSidebarProps) => {
  const [repositories, setRepositories] = useState<any[]>([]);
  const [fileStructure, setFileStructure] = useState<any[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<any>(null);

  useEffect(() => {
    // Fetch repositories when component mounts
    const fetchRepositories = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/github/repos", {
          credentials: 'include'
        });
        if (!response.ok) throw new Error("Failed to fetch repositories");
        const data = await response.json();
        setRepositories(data);
      } catch (error) {
        toast.error("Error fetching repositories");
        console.error("Error fetching repositories:", error);
      }
    };
    fetchRepositories();
  }, []);

  const handleSelectRepository = async (repo: any) => {
    try {
      const [owner, repoName] = repo.full_name.split('/');
      setSelectedRepo({ owner, name: repoName, full_name: repo.full_name });
      const response = await fetch(
        `http://localhost:8000/api/github/repos/${owner}/${repoName}/tree`,
        { credentials: 'include' }
      );
      if (!response.ok) throw new Error('Failed to fetch file structure');
      const structure = await response.json();
      setFileStructure(structure);
      toast.success('Repository files loaded successfully');
    } catch (error) {
      toast.error('Failed to load repository files');
      console.error('Error fetching file structure:', error);
    }
  };

  const handleFileSelect = (path: string) => {
    onFileSelect(path, selectedRepo);
  };

  return (
    <div className="border-r border-border h-full p-4">
      <h2 className="text-lg font-semibold mb-4">Select Repository</h2>
      <RepositoryCombobox
        repositories={repositories}
        onSelectRepository={handleSelectRepository}
      />
      {selectedRepo && (
        <div className="mt-4 h-[calc(100vh-24rem)]">
          <ScrollArea className="h-full rounded-md border">
            <FileTree files={fileStructure} onFileSelect={handleFileSelect} />
          </ScrollArea>
        </div>
      )}
    </div>
  );
};
