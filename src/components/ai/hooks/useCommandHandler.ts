import { useState } from "react";
import { Message } from "../types";
import { CommandType } from "../types/commands";
import { AIResponse } from "../types/ai-types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useCommandHandler = () => {
  const [activeCommand, setActiveCommand] = useState<CommandType | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [transformedCode, setTransformedCode] = useState<string | null>(null);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: content.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      if (content.startsWith("/add_solver")) {
        setActiveCommand("ADD_SOLVER");
      } else if (content.startsWith("/add_dataset")) {
        setActiveCommand("ADD_DATASET");
      } else {
        const { data, error } = await supabase.functions.invoke<AIResponse>('chat-completion', {
          body: { messages: [...messages, userMessage] }
        });

        if (error) throw error;
        if (!data?.content) throw new Error("Invalid response from chat completion");

        setMessages(prev => [...prev, {
          role: "assistant",
          content: data.content
        }]);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to get response");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    activeCommand,
    setActiveCommand,
    messages,
    setMessages,
    isLoading,
    setIsLoading,
    transformedCode,
    setTransformedCode,
    handleSendMessage,
  };
};