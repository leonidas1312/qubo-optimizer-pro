import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/playground/editor/CodeEditor";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CodeComparisonProps {
  originalCode: string;
  aiGeneratedCode: string;
  onAcceptChanges: () => void;
}

export const CodeComparison = ({ originalCode, aiGeneratedCode, onAcceptChanges }: CodeComparisonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAcceptChanges = async () => {
    try {
      // Here you would implement the logic to save to GitHub
      await onAcceptChanges();
      toast.success("Changes saved successfully to GitHub repository");
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to save changes to GitHub");
      console.error("Error saving changes:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          View Code Changes
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Compare Changes</DialogTitle>
          <DialogDescription>
            Review the changes before saving to your GitHub repository
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 h-[calc(100%-5rem)]">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Original Code</h3>
            <CodeEditor
              value={originalCode}
              onChange={() => {}}
              language="python"
              className="h-full"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">AI Generated Code</h3>
            <CodeEditor
              value={aiGeneratedCode}
              onChange={() => {}}
              language="python"
              className="h-full"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAcceptChanges}>
            Accept & Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};