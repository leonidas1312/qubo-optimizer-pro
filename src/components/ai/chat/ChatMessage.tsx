import { Bot, User } from "lucide-react";
import { ChatMessageProps } from "../types";

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className="mb-4 last:mb-0">
      <div
        className={`flex gap-3 ${
          message.role === "assistant" ? "items-start" : "items-start justify-end"
        }`}
      >
        {message.role === "assistant" && (
          <div className="w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white/80" />
          </div>
        )}
        <div
          className={`rounded-lg p-4 max-w-[80%] ${
            message.role === "assistant"
              ? "bg-black/20 text-white/90"
              : "bg-blue-600 text-white"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
        {message.role === "user" && (
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
            <User className="w-5 h-5 text-blue-500" />
          </div>
        )}
      </div>
    </div>
  );
};