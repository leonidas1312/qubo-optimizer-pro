import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ChatMessage } from "./types";
import { ChatMessageList } from "./ChatMessageList";
import { ChatInput } from "./ChatInput";

export const SolverChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello! How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("Llama 3.2 3B Instruct");
  const [availableModels, setAvailableModels] = useState<string[]>([]);

  useEffect(() => {
    fetchAvailableModels();
  }, []);

  const fetchAvailableModels = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/gpt4all/models");
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to fetch models");
      }
      
      const result = await response.json();
      const modelIds = result.data?.map((model: { id: string }) => model.id) || [];
      setAvailableModels(modelIds);
      
      if (!selectedModel && modelIds.length > 0) {
        setSelectedModel(modelIds[0]);
      }
    } catch (error) {
      console.error("Error fetching models:", error);
      toast.error(error instanceof Error ? error.message : "Failed to fetch available models");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/gpt4all/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: messages
            .concat(userMessage)
            .map(({ role, content }) => ({ role, content })),
          max_tokens: 1000,
          temperature: 0.28,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to get response from the model");
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.choices[0].message.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to get response from the model");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-[600px] bg-black/50 backdrop-blur-sm border-white/10">
      <div className="flex items-center gap-2 p-4 border-b border-white/10">
        <h2 className="text-xl font-semibold">ChatGPT</h2>
        <span className="text-sm text-muted-foreground">Online</span>
      </div>

      <div className="p-4 border-b border-white/10">
        <Select value={selectedModel} onValueChange={setSelectedModel}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            {availableModels.map((model) => (
              <SelectItem key={model} value={model}>
                {model}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ChatMessageList messages={messages} />
      <ChatInput 
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Card>
  );
};