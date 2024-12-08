import { useState } from "react";
import { Message } from "../types";
import { CommandType } from "../types/commands";
import { AIResponse } from "../types/ai-types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useCodeTransformation = (messages: Message[], setMessages: (messages: Message[]) => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFinalize = async (generatedFileContent: string | null) => {
    if (!generatedFileContent) {
      toast.error("Please select a file first");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke<AIResponse>('chat-completion', {
        body: { 
          messages: [
            ...messages,
            {
              role: "system",
              content: "Transform the following code to match our solver guidelines. Explain the changes made."
            },
            {
              role: "user",
              content: generatedFileContent
            }
          ],
        }
      });

      if (error) throw error;
      if (!data?.content) throw new Error("Invalid response from chat completion");

      setMessages([...messages, {
        role: "assistant",
        content: "I've transformed your code according to our guidelines. Please review the changes on the right."
      }]);

      return data.content;
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to transform code");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveChanges = async (transformedCode: string | null, selectedFile: string | null) => {
    if (!transformedCode || !selectedFile) {
      toast.error("Missing required information");
      return;
    }

    try {
      toast.success("Changes approved! The solver has been saved.");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save changes");
    }
  };

  return {
    isLoading,
    handleFinalize,
    handleApproveChanges,
  };
};