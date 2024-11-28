import { useState, useEffect } from "react";
import { ChatInput } from "./chat/ChatInput";
import { ChatMessage } from "./chat/ChatMessage";
import { ChatHeader } from "./chat/ChatHeader";
import { ExamplePrompts } from "./chat/ExamplePrompts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message, Repository } from "./types";
import { AIResponse } from "./types/ai-types";
import { RepositoryCombobox } from "@/components/github/RepositoryCombobox";
import { FileTree } from "@/components/github/FileTree";
import { Button } from "@/components/ui/button";
import { Eye, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from '@supabase/auth-helpers-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface AIAssistantChatProps {
  selectedFile: string | null;
  fileContent: string;
  onSelectRepository: (repo: Repository) => void;
}

export const AIAssistantChat = ({ selectedFile, fileContent, onSelectRepository }: AIAssistantChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [fileStructure, setFileStructure] = useState<any[]>([]);
  const [showFilePreview, setShowFilePreview] = useState(false);
  const [generatedFileContent, setGeneratedFileContent] = useState<string | null>(null);
  const [isSelectionOpen, setIsSelectionOpen] = useState(true);
  const session = useSession();

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

  const handleRepoSelect = async (repo: Repository) => {
    try {
      setSelectedRepo(repo);
      onSelectRepository(repo);
      const response = await fetch(
        `http://localhost:8000/api/github/repos/${repo.owner.login}/${repo.name}/tree`,
        { credentials: 'include' }
      );
      if (!response.ok) throw new Error('Failed to fetch file structure');
      const structure = await response.json();
      setFileStructure(structure);
      toast.success('Repository files loaded successfully');
    } catch (error) {
      toast.error('Failed to load repository files');
      console.error('Error fetching file structure:', error);
    }
  };

  const handleFileSelect = async (path: string) => {
    try {
      if (!selectedRepo) {
        toast.error("Please select a repository first");
        return;
      }

      const response = await fetch(
        `http://localhost:8000/api/github/repos/${selectedRepo.owner.login}/${selectedRepo.name}/contents/${path}`,
        { credentials: 'include' }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch file content');
      }
      
      const data = await response.json();
      const content = atob(data.content);
      setGeneratedFileContent(content);
      toast.success('File loaded successfully');
    } catch (error) {
      toast.error('Failed to load file content');
      console.error('Error fetching file:', error);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    if (!session) {
      toast.error("Please log in to use the AI assistant");
      return;
    }

    const userMessage: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      if (content.startsWith("ADD SOLVER") && selectedRepo && generatedFileContent) {
        try {
          const { data, error } = await supabase.functions.invoke<AIResponse>('chat-completion', {
            body: { 
              messages: [
                ...messages, 
                userMessage,
                {
                  role: "system",
                  content: `You are a specialized AI for analyzing and adapting solver code. 
                  Current file content: ${generatedFileContent}
                  Guidelines: The solver must follow our platform's standard format as shown in our example algorithms:
                  1. Must have a main function with the same name as the file
                  2. Must accept standardized QUBO matrix input
                  3. Must return solution in the format (best_solution, best_cost, costs_per_iteration, elapsed_time)
                  4. Must handle parameters consistently with other solvers
                  Please analyze the code and suggest necessary modifications.`
                }
              ],
              command: "ADD_SOLVER",
              fileContent: generatedFileContent
            }
          });

          if (error) {
            console.error("Supabase function error:", error);
            throw error;
          }

          if (!data || !data.content) {
            console.error("Invalid response format:", data);
            throw new Error("Invalid response from chat completion");
          }

          const assistantMessage: Message = {
            role: "assistant",
            content: data.content
          };
          
          setMessages((prev) => [...prev, assistantMessage]);
          setShowFilePreview(true);
          toast.success("Solver analysis completed");
        } catch (error) {
          console.error("Error processing file:", error);
          toast.error("Failed to process file");
        }
      } else {
        const { data, error } = await supabase.functions.invoke<AIResponse>('chat-completion', {
          body: { messages: [...messages, userMessage] }
        });

        if (error) {
          console.error("Supabase function error:", error);
          throw error;
        }

        if (!data || !data.content) {
          console.error("Invalid response format:", data);
          throw new Error("Invalid response from chat completion");
        }

        const assistantMessage: Message = {
          role: "assistant",
          content: data.content
        };
        
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to get AI response");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <ChatHeader selectedFile={selectedFile} selectedRepo={selectedRepo?.name} />
      
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          <Collapsible
            open={isSelectionOpen}
            onOpenChange={setIsSelectionOpen}
            className="border-b"
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full flex items-center justify-between p-4 h-auto">
                <span className="font-medium">Repository & File Selection</span>
                {isSelectionOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-4 space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Select Repository</h3>
                  <RepositoryCombobox
                    repositories={repositories}
                    onSelectRepository={handleRepoSelect}
                  />
                </div>
                {selectedRepo && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Select File</h3>
                    <div className="border rounded-lg max-h-48 overflow-y-auto">
                      <FileTree files={fileStructure} onFileSelect={handleFileSelect} />
                    </div>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          <ScrollArea className="flex-1 px-4">
            {messages.length === 0 && (
              <ExamplePrompts onSelectPrompt={(prompt) => handleSendMessage(prompt)} />
            )}
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
          </ScrollArea>

          {showFilePreview && generatedFileContent && (
            <div className="p-4">
              <Button
                onClick={() => setShowFilePreview(!showFilePreview)}
                variant="outline"
                className="mb-2"
              >
                <Eye className="mr-2 h-4 w-4" />
                Toggle File Preview
              </Button>
              {showFilePreview && (
                <pre className="p-4 bg-secondary rounded-lg overflow-x-auto">
                  <code>{generatedFileContent}</code>
                </pre>
              )}
            </div>
          )}

          <ChatInput
            onSend={handleSendMessage}
            isLoading={isLoading}
            placeholder="Type 'ADD_SOLVER' to create a solver, or ask for help..."
          />
        </div>
      </div>
    </div>
  );
};