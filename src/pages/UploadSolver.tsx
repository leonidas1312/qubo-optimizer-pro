import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CodeEditor } from "@/components/playground/editor/CodeEditor";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function UploadSolver() {
  const { user } = useAuth();
  const [originalCode, setOriginalCode] = useState("");
  const [transformedCode, setTransformedCode] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [verificationResults, setVerificationResults] = useState<string[]>([]);

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
            <div>
              <Label htmlFor="name">Solver Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter a name for your solver"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain how your solver works and what problems it can solve"
                className="h-32"
              />
            </div>

            <div>
              <Label>Original Code</Label>
              <CodeEditor
                value={originalCode}
                onChange={setOriginalCode}
                language="python"
                className="h-[400px]"
              />
            </div>

            <Button 
              onClick={analyzeSolver} 
              disabled={isAnalyzing}
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

              <TabsContent value="transformed">
                <div className="space-y-4">
                  <Label>Transformed Code</Label>
                  <CodeEditor
                    value={transformedCode}
                    onChange={setTransformedCode}
                    language="python"
                    className="h-[400px]"
                  />
                </div>
              </TabsContent>

              <TabsContent value="verification">
                <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                  <div className="space-y-4">
                    <h3 className="font-medium">Verification Steps</h3>
                    {verificationResults.map((step, index) => (
                      <div 
                        key={index}
                        className="p-4 rounded-lg bg-muted"
                      >
                        {step}
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