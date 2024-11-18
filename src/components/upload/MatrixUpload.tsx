import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const MatrixUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      toast.success("File uploaded successfully");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/json': ['.json'],
    },
    maxFiles: 1,
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`drop-zone ${isDragActive ? 'active' : ''} cursor-pointer`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            {isDragActive ? "Drop your file here" : "Upload your QUBO matrix"}
          </h3>
          <p className="text-muted-foreground mb-4">
            Drag and drop your CSV or JSON file, or click to browse
          </p>
          <Button variant="outline">Select File</Button>
        </div>
      </div>
      {file && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <div className="flex items-center">
            <File className="h-5 w-5 mr-2" />
            <span className="font-medium">{file.name}</span>
          </div>
        </div>
      )}
    </div>
  );
};