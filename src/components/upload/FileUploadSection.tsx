import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { CodeEditor } from "@/components/playground/editor/CodeEditor";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface FileUploadSectionProps {
  originalCode: string;
  setOriginalCode: (code: string) => void;
  setSelectedFile: (file: File | null) => void;
}

export const FileUploadSection = ({
  originalCode,
  setOriginalCode,
  setSelectedFile,
}: FileUploadSectionProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.name.endsWith('.py')) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setOriginalCode(content);
        };
        reader.readAsText(file);
        toast.success('File loaded successfully');
      } else {
        toast.error('Please select a Python file');
        event.target.value = '';
      }
    }
  };

  return (
    <div className="space-y-4">
      {!originalCode ? (
        <div className="border-2 border-dashed rounded-lg p-6 space-y-4">
          <div className="flex flex-col items-center justify-center text-center">
            <Upload className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">Upload Your Python File</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Select a .py file containing your optimization algorithm
            </p>
            <Input
              type="file"
              accept=".py"
              onChange={handleFileChange}
              className="max-w-xs"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Original Code</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setOriginalCode("");
                setSelectedFile(null);
              }}
            >
              Change File
            </Button>
          </div>
          <div className="border rounded-md overflow-hidden">
            <CodeEditor
              value={originalCode}
              onChange={setOriginalCode}
              language="python"
              className="min-h-[400px]"
            />
          </div>
        </div>
      )}
    </div>
  );
};