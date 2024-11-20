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
        onMatrixLoaded(data.matrix);
        toast.success("QUBO matrix loaded successfully");
      } catch (error) {
        toast.error("Failed to load QUBO matrix");
        console.error(error);
      }
    }
  }, [onMatrixLoaded]);

  // ... keep existing code (dropzone setup and UI rendering)
};
