import { useState, useEffect } from "react";
import { ChatInput } from "./chat/ChatInput";
import { ChatMessage } from "./chat/ChatMessage";
import { ChatHeader } from "./chat/ChatHeader";
import { ExamplePrompts } from "./chat/ExamplePrompts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message, Repository } from "./types";
import { AIResponse } from "./types/ai-types";
import { RepositoryCombobox } from "@/components/github/RepositoryCombobox";
import { toast } from "sonner";
import { CodeAnalyzer } from "./chat/CodeAnalyzer";
import { CodeModifier } from "./chat/CodeModifier";
import { supabase } from "@/integrations/supabase/client";

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
      const { data: response, error } = await supabase.functions.invoke<AIResponse>('chat-completion', {
        body: { messages: [...messages, userMessage] }
      });

      if (error) throw error;

      if (!response) {
        throw new Error("No response received from chat completion");
      }

      // Create assistant message from the response content
      const assistantMessage: Message = {
        role: "assistant",
        content: response.content || "I apologize, but I couldn't generate a proper response."
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      toast.success("Response received successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to get AI response");
      
      // Add an error message to the chat
      const errorMessage: Message = {
        role: "assistant",
        content: "I apologize, but I encountered an error while processing your request. Please try again."
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setAnalyzingFile(null);
      setModifyingFile(null);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <ChatHeader selectedFile={selectedFile} />
      
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="p-4 space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="text-sm font-medium mb-2">Select Repository</h3>
              <RepositoryCombobox
                repositories={repositories}
                onSelectRepository={onSelectRepository}
              />
            </div>

            <CodeAnalyzer
              isOpen={isAnalyzerOpen}
              onOpenChange={setIsAnalyzerOpen}
              analyzingFile={analyzingFile}
              selectedFile={selectedFile}
              fileContent={fileContent}
            />

            <CodeModifier
              isOpen={isModifierOpen}
              onOpenChange={setIsModifierOpen}
              modifyingFile={modifyingFile}
              selectedFile={selectedFile}
              fileContent={fileContent}
            />
          </div>

          <ScrollArea className="flex-1 px-4">
            {messages.length === 0 && (
              <ExamplePrompts onSelectPrompt={(prompt) => handleSendMessage(prompt)} />
            )}
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
          </ScrollArea>

          <ChatInput
            onSend={handleSendMessage}
            isLoading={isLoading}
            placeholder="Enter a GitHub repository and file path (e.g., 'owner/repo/path/to/file.py') or ask for help..."
          />
        </div>
      </div>
    </div>
  );
};