import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { FileTree } from "@/components/github/FileTree";
import { RepositoryCombobox } from "@/components/github/RepositoryCombobox";

interface StepOneProps {
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

export const StepOne = ({
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
}: StepOneProps) => {
  return (
    <Card className="p-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Repository Files</h3>
          <RepositoryCombobox
            repositories={repositories}
            onSelectRepository={setSelectedRepo}
          />
          <div className="h-[400px] border rounded-md">
            {selectedRepo ? (
              <FileTree files={fileStructure} onFileSelect={onFileSelect} />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Select a repository to view files
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Solver Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter a name for your solver"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what your solver does and how it works"
                  className="h-32"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};