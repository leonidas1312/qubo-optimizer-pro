import { useState } from "react";
import { ChatInput } from "./chat/ChatInput";
import { ChatMessage } from "./chat/ChatMessage";
import { ChatHeader } from "./chat/ChatHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message, Repository } from "./types";
import { toast } from "sonner";

interface AIAssistantChatProps {
  selectedFile: string | null;
  fileContent: string;
  onSelectRepository: (repo: Repository) => void;
}

export const AIAssistantChat = ({ selectedFile, fileContent, onSelectRepository }: AIAssistantChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);
    try {
      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error("Failed to get AI response");

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to get AI response");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <ChatHeader selectedFile={selectedFile} />
      
      <ScrollArea className="flex-1 px-6 py-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </ScrollArea>

      <div className="p-4 border-t">
        <ChatInput
          onSend={handleSendMessage}
          isLoading={isLoading}
          placeholder="Enter a message or ask for help..."
        />
      </div>
    </div>
  );
};