import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from 'react-markdown';
import { CodeEditor } from "@/components/playground/editor/CodeEditor";

interface AnalysisResultsProps {
  analysis: string;
  transformedCode: string;
  setTransformedCode: (code: string) => void;
  verificationSteps: string;
}

export const AnalysisResults = ({
  analysis,
  transformedCode,
  setTransformedCode,
  verificationSteps
}: AnalysisResultsProps) => {
  return (
    <Tabs defaultValue="analysis">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="analysis">Analysis</TabsTrigger>
        <TabsTrigger value="code">Transformed Code</TabsTrigger>
        <TabsTrigger value="verification">Verification</TabsTrigger>
      </TabsList>

      <TabsContent value="analysis" className="mt-4">
        <ScrollArea className="h-[600px] w-full rounded-md border p-4">
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>{analysis}</ReactMarkdown>
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

      <TabsContent value="verification" className="mt-4">
        <ScrollArea className="h-[600px] w-full rounded-md border p-4">
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>{verificationSteps}</ReactMarkdown>
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
};