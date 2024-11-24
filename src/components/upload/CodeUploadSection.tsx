import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

interface CodeUploadSectionProps {
  code?: string;
  fileName?: string | null;
  onCodeChange?: (code: string) => void;
}

export function CodeUploadSection({ code, fileName, onCodeChange }: CodeUploadSectionProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.name.endsWith('.py')) {
        setSelectedFile(file);
      } else {
        toast.error('Please select a Python file');
        event.target.value = '';
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    if (!isAuthenticated) {
      toast.error('Please log in to upload files');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('http://localhost:8000/api/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      toast.success('File uploaded successfully');
      setSelectedFile(null);
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="file">Upload Python File</Label>
        <Input
          id="file"
          type="file"
          accept=".py"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </div>
      {selectedFile && (
        <div className="text-sm text-muted-foreground">
          Selected file: {selectedFile.name}
        </div>
      )}
      <Button
        onClick={handleUpload}
        disabled={!selectedFile || isUploading}
        className="w-full"
      >
        {isUploading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
}