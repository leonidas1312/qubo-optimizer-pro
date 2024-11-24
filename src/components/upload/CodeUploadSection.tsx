import { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CodeUploadSectionProps {
  code: string;
  fileName: string | null;
  onCodeChange: (value: string) => void;
}

export const CodeUploadSection = ({
  code,
  fileName,
  onCodeChange,
}: CodeUploadSectionProps) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [showCreateQubotDialog, setShowCreateQubotDialog] = useState<boolean>(false);
  const [qubotName, setQubotName] = useState<string>("");
  const [framework, setFramework] = useState<string>("");

  useEffect(() => {
    if (fileName?.toLowerCase().endsWith(".pdf")) {
      try {
        const sanitizedCode = code.replace(/\s/g, "").replace(/[^A-Za-z0-9+/=]/g, "");
        const binary = window.atob(sanitizedCode);
        const buffer = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          buffer[i] = binary.charCodeAt(i);
        }
        const blob = new Blob([buffer], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
        return () => URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error decoding Base64 or creating PDF Blob:", error);
        setPdfUrl(null);
      }
    } else {
      setPdfUrl(null);
    }
  }, [code, fileName]);

  const renderFileContent = () => {
    if (!fileName) {
      return (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          Select a file to view its contents
        </div>
      );
    }

    const fileNameLower = fileName.toLowerCase();

    if (fileNameLower.endsWith(".pdf") && pdfUrl) {
      return (
        <iframe
          src={pdfUrl}
          className="w-full h-full border-none"
          title="PDF viewer"
        />
      );
    } else if (
      fileNameLower.endsWith(".png") ||
      fileNameLower.endsWith(".jpg") ||
      fileNameLower.endsWith(".jpeg") ||
      fileNameLower.endsWith(".gif")
    ) {
      return (
        <div className="flex justify-center items-center h-full">
          <img
            src={`data:image/*;base64,${code}`}
            alt="File preview"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      );
    } else {
      return (
        <MonacoEditor
          height="100%"
          defaultLanguage="python"
          value={code}
          theme="vs-dark"
          onChange={(value) => {
            if (isEditable && value !== undefined) {
              onCodeChange(value);
            }
          }}
          options={{
            readOnly: !isEditable,
            lineNumbers: "on",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            fontFamily:
              "Monaco, Menlo, 'Ubuntu Mono', Consolas, source-code-pro, monospace",
            automaticLayout: true,
            bracketPairColorization: { enabled: true },
            wordWrap: "on",
          }}
        />
      );
    }
  };

  const handleCreateQubot = () => {
    // Implement the logic to create a qubot
    console.log("Creating qubot with name:", qubotName, "and framework:", framework);
    // Close the dialog
    setShowCreateQubotDialog(false);
    // Reset form fields
    setQubotName("");
    setFramework("");
  };

  return (
    <div className="flex flex-col h-full bg-background border border-border rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-3 bg-muted/50 border-b border-border">
        <h2 className="text-sm font-medium">
          {fileName || "No file selected"}
        </h2>
        <div className="flex space-x-2">
          <Button onClick={() => setIsEditable(!isEditable)} variant="secondary">
            {isEditable ? "Cancel Edit" : "Edit"}
          </Button>
          <Button onClick={() => setShowCreateQubotDialog(true)} variant="primary">
            Create qubot
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">{renderFileContent()}</div>

      {/* Dialog for Creating Qubot */}
      <Dialog open={showCreateQubotDialog} onOpenChange={setShowCreateQubotDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Move to the playground</DialogTitle>
            <DialogDescription>
              Give your QUBOt a name and select a framework.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="qubot-name">QUBOt Name</Label>
              <Input
                id="qubot-name"
                placeholder="TSPsolver24"
                value={qubotName}
                onChange={(e) => setQubotName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select
                value={framework}
                onValueChange={(value) => setFramework(value)}
              >
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="csharp">C#</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateQubotDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateQubot} disabled={!qubotName || !framework}>
              Create QUBOt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
