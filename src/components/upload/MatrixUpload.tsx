import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

interface MatrixUploadProps {
  onMatrixLoaded: (matrix: number[][], constant: number) => void;
}

export const MatrixUpload = ({ onMatrixLoaded }: MatrixUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [matrixPreview, setMatrixPreview] = useState<string>("");
  const [constant, setConstant] = useState<number | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      try {
        const formData = new FormData();
        formData.append('file', uploadedFile);
        
        const response = await fetch('http://localhost:8000/api/load-matrix', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Failed to load matrix');
        
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        
        setFile(uploadedFile);
        setMatrixPreview(formatMatrixPreview(data.matrix));
        setConstant(data.constant);
        onMatrixLoaded(data.matrix, data.constant);
        toast.success("QUBO matrix and constant loaded successfully");
      } catch (error) {
        toast.error("Failed to load QUBO matrix and constant");
        console.error(error);
      }
    }
  }, [onMatrixLoaded]);

  const formatMatrixPreview = (matrix: number[][]) => {
    return matrix.map(row => 
      row.map(val => val.toFixed(2).padStart(8)).join('')
    ).join('\n');
  };

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
            Drag and drop your .npy file containing the QUBO matrix and constant, or click to browse
          </p>
          <Button variant="outline">Select File</Button>
        </div>
      </div>
      {file && matrixPreview && (
        <Card className="mt-4 p-4 bg-muted">
          <div className="space-y-4">
            <div className="flex items-center">
              <File className="h-5 w-5 mr-2" />
              <span className="font-medium">{file.name}</span>
            </div>
            <div>
              <h4 className="font-medium mb-2">QUBO Matrix Preview:</h4>
              <pre className="bg-background p-4 rounded-md overflow-x-auto">
                {matrixPreview}
              </pre>
            </div>
            {constant !== null && (
              <div>
                <h4 className="font-medium mb-2">Constant:</h4>
                <span className="font-mono">{constant.toFixed(2)}</span>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};