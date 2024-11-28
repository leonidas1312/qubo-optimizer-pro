import { useState } from "react";
import { Repository } from "../types";
import { RepositoryCombobox } from "@/components/github/RepositoryCombobox";
import { FileTree } from "@/components/github/FileTree";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface RepositorySectionProps {
  repositories: Repository[];
  selectedRepo: Repository | null;
  fileStructure: any[];
  isSelectionOpen: boolean;
  onSelectRepository: (repo: Repository) => void;
  onFileSelect: (path: string) => void;
  onOpenChange: (open: boolean) => void;
}

export const RepositorySection = ({
  repositories,
  selectedRepo,
  fileStructure,
  isSelectionOpen,
  onSelectRepository,
  onFileSelect,
  onOpenChange,
}: RepositorySectionProps) => {
  return (
    <Collapsible
      open={isSelectionOpen}
      onOpenChange={onOpenChange}
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
              onSelectRepository={onSelectRepository}
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