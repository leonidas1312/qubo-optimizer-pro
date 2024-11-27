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
    <ScrollArea className="flex-1 px-6 py-4">
      <div className="space-y-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              message.role === "assistant" ? "items-start" : "items-end"
            } animate-fade-in`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.role === "assistant"
                  ? "bg-white/10 text-white/90"
                  : "bg-blue-600 text-white"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
            <span className="text-xs text-muted-foreground mt-2 px-1">
              {formatTimestamp(message.timestamp)}
            </span>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};