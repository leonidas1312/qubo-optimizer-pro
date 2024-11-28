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
import { supabase } from "@/integrations/supabase/client";
import { useSession } from '@supabase/auth-helpers-react';

interface AIAssistantChatProps {
  selectedFile: string | null;
  fileContent: string;
  onSelectRepository: (repo: Repository) => void;
}

export const AIAssistantChat = ({ selectedFile, fileContent, onSelectRepository }: AIAssistantChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [repositories, setRepositories] = useState<Repository[]>([]);
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
      // Check if the message is an ADD SOLVER command
      if (content.startsWith("ADD SOLVER") && selectedFile) {
        const { data, error } = await supabase.functions.invoke<AIResponse>('chat-completion', {
          body: { 
            messages: [
              ...messages, 
              userMessage,
              {
                role: "system",
                content: `You are a specialized AI for analyzing and adapting solver code. 
                Current file: ${selectedFile}
                File content: ${fileContent}
                Guidelines: The solver must follow our platform's standard format as shown in our example algorithms:
                1. Must have a main function with the same name as the file
                2. Must accept standardized QUBO matrix input
                3. Must return solution in the format (best_solution, best_cost, costs_per_iteration, elapsed_time)
                4. Must handle parameters consistently with other solvers
                Please analyze the code and suggest necessary modifications.`
              }
            ],
            command: "ADD_SOLVER",
            fileContent,
            fileName: selectedFile
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
        toast.success("Solver analysis completed");
      } else {
        // Handle regular chat messages
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
            placeholder="Type 'ADD SOLVER filename' to create a solver, or ask for help..."
          />
        </div>
      </div>
    </div>
  );
};