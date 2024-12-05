import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { BasicInfoForm } from "@/components/upload/BasicInfoForm";
import { FileUploadSection } from "@/components/upload/FileUploadSection";
import { CodeEditor } from "@/components/playground/editor/CodeEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function UploadSolver() {
  const [originalCode, setOriginalCode] = useState("");
  const [transformedCode, setTransformedCode] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisOutput, setAnalysisOutput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<number | NodeJS.Timeout>();

  const analyzeSolver = async () => {
    if (!originalCode || !description) {
      toast.error("Please provide both code and description");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisOutput("");
    setProgress(0);
    
    try {
      const response = await fetch('https://zddqnxesbhbvmdcyqpuw.supabase.co/functions/v1/analyze-solver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          code: originalCode,
          description: description
        })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze solver');
      }

      // Start progress animation
      progressInterval.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev;
          return prev + 1;
        });
      }, 500);

      const reader = new ReadableStreamDefaultReader(response.body!);
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const text = new TextDecoder().decode(value);
        const lines = text.split('\n');
        
        for (const line of lines) {
          if (line.trim() === '') continue;
          if (line.startsWith('data: ')) {
            try {
              const { content } = JSON.parse(line.slice(5));
              setAnalysisOutput(prev => prev + content);
              
              // Extract transformed code if present
              const codeMatch = content.match(/```python\n([\s\S]*?)```/);
              if (codeMatch) {
                setTransformedCode(codeMatch[1]);
              }
            } catch (e) {
              console.error('Error parsing chunk:', e);
            }
          }
        }
      }

      toast.success("Analysis completed successfully");
    } catch (error) {
      console.error("Error analyzing solver:", error);
      toast.error(error instanceof Error ? error.message : "Failed to analyze solver");
    } finally {
      clearInterval(progressInterval.current);
      setProgress(100);
      setIsAnalyzing(false);
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
                {showCode ? "Show Info" : "Show Code"}
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
              {isAnalyzing ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </div>
              ) : (
                "Analyze & Transform"
              )}
            </Button>

            {isAnalyzing && (
              <Progress value={progress} className="w-full" />
            )}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <Tabs defaultValue="analysis">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                <TabsTrigger value="code">Transformed Code</TabsTrigger>
              </TabsList>

              <TabsContent value="analysis" className="mt-4">
                <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown>{analysisOutput}</ReactMarkdown>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="code" className="mt-4">
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
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}