import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CodeEditor } from "@/components/playground/editor/CodeEditor";
import { BasicInfoForm } from "@/components/upload/BasicInfoForm";
import { FileUploadSection } from "@/components/upload/FileUploadSection";
import { Code2, FileText } from "lucide-react";
import ReactMarkdown from 'react-markdown';

export default function UploadSolver() {
  const { user } = useAuth();
  const [originalCode, setOriginalCode] = useState("");
  const [transformedCode, setTransformedCode] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [verificationResults, setVerificationResults] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showCode, setShowCode] = useState(false);

  const analyzeSolver = async () => {
    if (!originalCode || !description) {
      toast.error("Please provide both code and description");
      return;
    }

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-solver', {
        body: { 
          code: originalCode,
          description: description
        }
      });

      if (error) throw error;

      setTransformedCode(data.transformedCode);
      setVerificationResults(data.verificationSteps);
      toast.success("Code analyzed and transformed successfully");
    } catch (error) {
      console.error("Error analyzing solver:", error);
      toast.error("Failed to analyze solver");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSave = async () => {
    if (!user) {
      toast.error("Please log in to save solvers");
      return;
    }

    if (!name || !transformedCode) {
      toast.error("Please provide a name and analyze the code first");
      return;
    }

    try {
      const { error } = await supabase
        .from('solvers')
        .insert({
          name,
          description,
          code_content: transformedCode,
          creator_id: user.id,
          is_public: true,
          solver_type: 'custom'
        });

      if (error) throw error;
      toast.success("Solver saved successfully");
    } catch (error) {
      console.error("Error saving solver:", error);
      toast.error("Failed to save solver");
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Upload Solver</h1>
        <p className="text-muted-foreground mt-2">
          Transform your optimization code into a platform-compatible solver
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex justify-end mb-4">
              <Button
                variant="outline"
                onClick={() => setShowCode(!showCode)}
                className="flex items-center gap-2"
              >
                {showCode ? (
                  <>
                    <FileText className="h-4 w-4" />
                    Show Info
                  </>
                ) : (
                  <>
                    <Code2 className="h-4 w-4" />
                    Show Code
                  </>
                )}
              </Button>
            </div>

            {showCode ? (
              <FileUploadSection
                originalCode={originalCode}
                setOriginalCode={setOriginalCode}
                setSelectedFile={setSelectedFile}
              />
            ) : (
              <BasicInfoForm
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
              />
            )}

            <Button 
              onClick={analyzeSolver} 
              disabled={isAnalyzing || !originalCode}
              className="w-full"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze & Transform"}
            </Button>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <Tabs defaultValue="transformed">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="transformed">Transformed Code</TabsTrigger>
                <TabsTrigger value="verification">Verification</TabsTrigger>
              </TabsList>

              <TabsContent value="transformed" className="mt-4">
                <div className="space-y-4">
                  <div className="border rounded-md overflow-hidden h-[600px]">
                    <CodeEditor
                      value={transformedCode}
                      onChange={setTransformedCode}
                      language="python"
                      className="h-full"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="verification" className="mt-4">
                <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                  <div className="space-y-4">
                    <h3 className="font-medium">Verification Steps</h3>
                    {verificationResults.map((step, index) => (
                      <div 
                        key={index}
                        className="p-4 rounded-lg bg-muted prose prose-invert max-w-none"
                      >
                        <ReactMarkdown>{step}</ReactMarkdown>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>

            <Button 
              onClick={handleSave}
              className="w-full mt-6"
              disabled={!transformedCode}
            >
              Save Solver
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}