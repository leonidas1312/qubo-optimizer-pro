import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface FilePreviewProps {
  content: string;
  showPreview: boolean;
  onTogglePreview: () => void;
}

export const FilePreview = ({ content, showPreview, onTogglePreview }: FilePreviewProps) => {
  return (
    <div className="p-4">
      <Button
        onClick={onTogglePreview}
        variant="outline"
        className="mb-2"
      >
        <Eye className="mr-2 h-4 w-4" />
        Toggle File Preview
      </Button>
      {showPreview && (
        <pre className="p-4 bg-secondary rounded-lg overflow-x-auto">
          <code>{content}</code>
        </pre>
      )}
    </div>
  );
};