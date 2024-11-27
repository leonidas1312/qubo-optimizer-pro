import { useState, useEffect } from "react";
import { ChatInput } from "./chat/ChatInput";
import { ChatMessage } from "./chat/ChatMessage";
import { ChatHeader } from "./chat/ChatHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Code, FileCode, Loader2 } from "lucide-react";
import { Message, Repository } from "./types";
import { RepositoryCombobox } from "@/components/github/RepositoryCombobox";
import { toast } from "sonner";
import { CodeEditor } from "@/components/playground/editor/CodeEditor";

interface AIAssistantChatProps {
  selectedFile: string | null;
  fileContent: string;
  onSelectRepository: (repo: Repository) => void;
}

export const AIAssistantChat = ({ selectedFile, fileContent, onSelectRepository }: AIAssistantChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzerOpen, setIsAnalyzerOpen] = useState(false);
  const [isModifierOpen, setIsModifierOpen] = useState(false);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [analyzingFile, setAnalyzingFile] = useState<string | null>(null);
  const [modifyingFile, setModifyingFile] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/github/repos", {
          credentials: 'include'
        });
        if (!response.ok) throw new Error("Failed to fetch repositories");
        const data = await response.json();
        setRepositories(data);
      } catch (error) {
        toast.error("Error fetching repositories");
        console.error("Error fetching repositories:", error);
      }
    };
    fetchRepositories();
  }, []);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);
    setAnalyzingFile(selectedFile);
    setModifyingFile(selectedFile);

    try {
      const response = await fetch("http://localhost:8000/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gpt4all-j",
          messages: [...messages, userMessage],
          temperature: 0.28,
          max_tokens: 1000
        }),
      });

      if (!response.ok) throw new Error("Failed to get AI response");

      const data = await response.json();
      const assistantMessage = {
        role: "assistant" as const,
        content: data.choices[0].message.content
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      toast.success("Response received successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to get AI response");
    } finally {
      setIsLoading(false);
      setAnalyzingFile(null);
      setModifyingFile(null);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <ChatHeader selectedFile={selectedFile} />
      
      <div className="flex-1 p-4 space-y-4">
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="text-sm font-medium mb-2">Select Repository</h3>
            <RepositoryCombobox
              repositories={repositories}
              onSelectRepository={onSelectRepository}
            />
          </div>

          <Collapsible
            open={isAnalyzerOpen}
            onOpenChange={setIsAnalyzerOpen}
            className="w-full space-y-2"
          >
            <div className="flex items-center justify-between space-x-4 p-2 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2">
                {analyzingFile ? (
                  <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
                ) : (
                  <Code className="h-5 w-5 text-blue-500" />
                )}
                <h4 className="text-sm font-semibold">Code Analyzer (LLM A)</h4>
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-2">
              <div className="rounded-md border px-4 py-3 text-sm space-y-2">
                {analyzingFile ? (
                  <p className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing file: {analyzingFile}
                  </p>
                ) : selectedFile ? (
                  <CodeEditor
                    value={fileContent}
                    onChange={() => {}}
                    language="javascript"
                    className="h-[200px] border-none"
                  />
                ) : (
                  <>
                    <p>Analyzing code structure and dependencies...</p>
                    <p>Identifying key components and interactions...</p>
                    <p>Generating code insights for modification...</p>
                  </>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible
            open={isModifierOpen}
            onOpenChange={setIsModifierOpen}
            className="w-full space-y-2"
          >
            <div className="flex items-center justify-between space-x-4 p-2 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2">
                {modifyingFile ? (
                  <Loader2 className="h-5 w-5 text-green-500 animate-spin" />
                ) : (
                  <FileCode className="h-5 w-5 text-green-500" />
                )}
                <h4 className="text-sm font-semibold">Code Modifier (LLM B)</h4>
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-2">
              <div className="rounded-md border px-4 py-3 text-sm space-y-2">
                {modifyingFile ? (
                  <p className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Modifying file: {modifyingFile}
                  </p>
                ) : selectedFile ? (
                  <CodeEditor
                    value={fileContent}
                    onChange={() => {}}
                    language="javascript"
                    className="h-[200px] border-none"
                  />
                ) : (
                  <>
                    <p>Planning code modifications...</p>
                    <p>Implementing platform integrations...</p>
                    <p>Validating changes and maintaining functionality...</p>
                  </>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <ScrollArea className="flex-1 h-[400px] pr-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </ScrollArea>
      </div>

      <div className="p-4 border-t">
        <ChatInput
          onSend={handleSendMessage}
          isLoading={isLoading}
          placeholder="Enter a GitHub repository and file path (e.g., 'owner/repo/path/to/file.py') or ask for help..."
        />
      </div>
    </div>
  );
};