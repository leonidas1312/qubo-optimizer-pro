import { Card } from "@/components/ui/card";
import { RepositoryCombobox } from "@/components/github/RepositoryCombobox";
import { FileTree } from "@/components/github/FileTree";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FolderOpen, FileCode2 } from "lucide-react";

interface StepChooseFileProps {
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  repositories: any[];
  selectedRepo: any;
  setSelectedRepo: (repo: any) => void;
  fileStructure: any[];
  setFileStructure: (files: any[]) => void;
  onFileSelect: (path: string) => void;
}

export const StepChooseFile = ({
  name,
  setName,
  description,
  setDescription,
  repositories,
  selectedRepo,
  setSelectedRepo,
  fileStructure,
  setFileStructure,
  onFileSelect,
}: StepChooseFileProps) => {
  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-12 w-12 rounded-full bg-blue-600/10 flex items-center justify-center">
          <FolderOpen className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Choose Your File</h2>
          <p className="text-muted-foreground">
            Select a repository and Python file containing your optimization algorithm
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Give your solver a name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter a name for your solver"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Describe what it does</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain how your solver works and what problems it can solve"
              className="h-32"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label>Select a repository</Label>
          <RepositoryCombobox
            repositories={repositories}
            onSelectRepository={setSelectedRepo}
          />
          <div className="h-[400px] border rounded-md">
            {selectedRepo ? (
              <FileTree files={fileStructure} onFileSelect={onFileSelect} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4">
                <FileCode2 className="h-12 w-12 opacity-50" />
                <p>Select a repository to view files</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};