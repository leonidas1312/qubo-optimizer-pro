import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/playground/editor/CodeEditor";
import { toast } from "sonner";

interface TransformedCodeProps {
  code: string;
  onApprove: () => void;
}

export const TransformedCode = ({ code, onApprove }: TransformedCodeProps) => {
  return (
    <div className="h-full flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Transformed Code</h2>
        <Button 
          onClick={onApprove}
          className="bg-green-600 hover:bg-green-700"
        >
          I Approve Changes
        </Button>
      </div>
      <div className="flex-1 border rounded-lg overflow-hidden">
        <CodeEditor
          value={code}
          onChange={() => {}}
          language="python"
          className="h-full"
        />
      </div>
    </div>
  );
};