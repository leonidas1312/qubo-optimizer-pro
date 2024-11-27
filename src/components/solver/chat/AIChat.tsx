import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatInput } from "./ChatInput";
import { ChatMessageList } from "./ChatMessageList";
import { useState } from "react";
import { ChatMessage } from "./types";
import { cn } from "@/lib/utils";

interface AIChatProps {
  className?: string;
}

export const AIChat = ({ className }: AIChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // TODO: Implement AI response logic
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: "This is a placeholder response. AI integration coming soon!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col h-full bg-black/30 backdrop-blur-sm border-r border-white/10", className)}>
      <div className="p-4 border-b border-white/10 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-green-500"></div>
        <h3 className="text-sm font-medium text-white/80">AI Assistant</h3>
      </div>
      <div className="flex-1 flex flex-col">
        <ChatMessageList messages={messages} />
        <ChatInput
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};