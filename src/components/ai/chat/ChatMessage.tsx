import { Bot, User } from "lucide-react";

interface Message {
  role: "assistant" | "user";
  content: string;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
      className={`flex gap-3 ${
        message.role === "assistant" ? "items-start" : "items-start justify-end"
      }`}
    >
      {message.role === "assistant" && (
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
          <Bot className="w-5 h-5" />
        </div>
      )}
      <div
        className={`rounded-lg p-3 max-w-[80%] ${
          message.role === "assistant"
            ? "bg-accent"
            : "bg-blue-500/20"
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
      {message.role === "user" && (
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
          <User className="w-5 h-5" />
        </div>
      )}
    </div>
  );
};