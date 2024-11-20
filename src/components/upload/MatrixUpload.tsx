import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface MatrixUploadProps {
  onMatrixLoaded: (matrix: number[][]) => void;
}

export const MatrixUpload = ({ onMatrixLoaded }: MatrixUploadProps) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      try {
        const arrayBuffer = await uploadedFile.arrayBuffer();
        // Convert ArrayBuffer to Buffer for Python processing
        const buffer = Buffer.from(arrayBuffer);
        
        // Send the buffer to the Python backend
        const response = await fetch('/api/load-matrix', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/octet-stream',
          },
          body: buffer,
        });

        if (!response.ok) throw new Error('Failed to load matrix');
        
        const matrix = await response.json();
        setFile(uploadedFile);
        onMatrixLoaded(matrix);
        toast.success("QUBO matrix loaded successfully");
      } catch (error) {
        toast.error("Failed to load QUBO matrix");
        console.error(error);
      }
    }
  }, [onMatrixLoaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/x-npy': ['.npy'],
    },
    maxFiles: 1,
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 ${
          isDragActive ? 'border-primary bg-accent/50' : 'border-muted'
        } cursor-pointer transition-colors`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            {isDragActive ? "Drop your file here" : "Upload your QUBO matrix"}
          </h3>
          <p className="text-muted-foreground mb-4">
            Drag and drop your .npy file, or click to browse
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