import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatInput } from "./ChatInput";
import { ChatMessageList } from "./ChatMessageList";
import { useState } from "react";
import { ChatMessage } from "./types";

export const AIChat = () => {
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
    <div className="flex-1 flex flex-col h-full bg-black/30">
      <div className="p-4 border-b border-white/10">
        <h3 className="text-sm font-medium text-white/80">AI Assistant</h3>
      </div>
      <div className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 p-4">
          <ChatMessageList messages={messages} />
        </ScrollArea>
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