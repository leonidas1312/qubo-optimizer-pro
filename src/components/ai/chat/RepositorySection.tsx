import { Repository } from "../types";
import { RepositoryCombobox } from "@/components/github/RepositoryCombobox";
import { FileTree } from "@/components/github/FileTree";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface RepositorySectionProps {
  isSelectionOpen: boolean;
  setIsSelectionOpen: (open: boolean) => void;
  repositories: Repository[];
  selectedRepo: Repository | null;
  fileStructure: any[];
  onRepoSelect: (repo: Repository) => void;
  onFileSelect: (path: string) => void;
}

export const RepositorySection = ({
  isSelectionOpen,
  setIsSelectionOpen,
  repositories,
  selectedRepo,
  fileStructure,
  onRepoSelect,
  onFileSelect,
}: RepositorySectionProps) => {
  return (
    <Collapsible
      open={isSelectionOpen}
      onOpenChange={setIsSelectionOpen}
      className="border-b"
    >
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full flex items-center justify-between p-4 h-auto">
          <span className="font-medium">Repository & File Selection</span>
          {isSelectionOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Select Repository</h3>
            <RepositoryCombobox
              repositories={repositories}
              onSelectRepository={onRepoSelect}
            />
          </div>
          {selectedRepo && (
            <div>
              <h3 className="text-sm font-medium mb-2">Select File</h3>
              <div className="border rounded-lg max-h-48 overflow-y-auto">
                <FileTree files={fileStructure} onFileSelect={onFileSelect} />
              </div>
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};