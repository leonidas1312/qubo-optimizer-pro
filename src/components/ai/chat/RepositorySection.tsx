import { Repository } from "../types";
import { RepositoryCombobox } from "@/components/github/RepositoryCombobox";
import { FileTree } from "@/components/github/FileTree";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, FolderGit2, FileCode2 } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface RepositorySectionProps {
  repositories: Repository[];
  selectedRepo: Repository | null;
  fileStructure: any[];
  onRepoSelect: (repo: Repository) => void;
  onFileSelect: (path: string) => void;
  isSelectionOpen: boolean;
  setIsSelectionOpen: (open: boolean) => void;
}

export const RepositorySection = ({
  repositories,
  selectedRepo,
  fileStructure,
  onRepoSelect,
  onFileSelect,
  isSelectionOpen,
  setIsSelectionOpen,
}: RepositorySectionProps) => {
  return (
    <Collapsible
      open={isSelectionOpen}
      onOpenChange={setIsSelectionOpen}
      className="border-b bg-card/50 backdrop-blur-sm"
    >
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full flex items-center justify-between p-4 h-auto">
          <div className="flex items-center gap-2">
            <FolderGit2 className="h-5 w-5 text-purple-500" />
            <span className="font-medium">Repository & File Selection</span>
          </div>
          {isSelectionOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <FolderGit2 className="h-4 w-4" />
              Select Repository
            </label>
            <RepositoryCombobox
              repositories={repositories}
              onSelectRepository={onRepoSelect}
            />
          </div>
          {selectedRepo && (
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <FileCode2 className="h-4 w-4" />
                Select File
              </label>
              <div className="border rounded-lg max-h-48 overflow-y-auto bg-background/50">
                <FileTree files={fileStructure} onFileSelect={onFileSelect} />
              </div>
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};