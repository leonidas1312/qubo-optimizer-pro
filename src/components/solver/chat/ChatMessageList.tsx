import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./types";

interface ChatMessageListProps {
  messages: ChatMessage[];
}

const formatTimestamp = (date: Date) => {
  if (isNaN(date.getTime())) return "";
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  
  if (minutes < 1) return "Just now";
  if (minutes === 1) return "1 minute ago";
  return `${minutes} minutes ago`;
};

export const ChatMessageList = ({ messages }: ChatMessageListProps) => {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              message.role === "assistant" ? "items-start" : "items-end"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "assistant"
                  ? "bg-white/10"
                  : "bg-blue-600"
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
            <span className="text-xs text-muted-foreground mt-1">
              {formatTimestamp(message.timestamp)}
            </span>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};