import { FileTree } from "@/components/github/FileTree";
import { RepositoryCombobox } from "@/components/github/RepositoryCombobox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface RepositorySectionProps {
  repositories: any[];
  selectedRepo: any;
  setSelectedRepo: (repo: any) => void;
  fileStructure: any[];
  setFileStructure: (files: any[]) => void;
  onFileSelect: (path: string) => void;
}

export const RepositorySection = ({
  repositories,
  selectedRepo,
  setSelectedRepo,
  fileStructure,
  setFileStructure,
  onFileSelect,
}: RepositorySectionProps) => {
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
            <FileTree files={fileStructure} onFileSelect={onFileSelect} />
          </ScrollArea>
        </div>
      )}
    </div>
  );
};