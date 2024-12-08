import { Bot, User } from "lucide-react";
import { ChatMessageProps } from "../types";
import { motion } from "framer-motion";

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isAssistant = message.role === "assistant";

  return (
    <motion.div 
      className="mb-6 last:mb-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`flex gap-3 ${isAssistant ? "items-start" : "items-start justify-end"}`}>
        {isAssistant && (
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <Bot className="w-5 h-5 text-purple-500" />
          </div>
        )}
        <div
          className={`rounded-lg p-4 max-w-[80%] ${
            isAssistant
              ? "bg-card text-card-foreground shadow-sm"
              : "bg-purple-500 text-white"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
        {!isAssistant && (
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <User className="w-5 h-5 text-purple-500" />
          </div>
        )}
      </div>
    </motion.div>
  );
};