import { useState } from "react";
import { Message } from "../types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { ExamplePrompts } from "./ExamplePrompts";
import { FilePreview } from "./FilePreview";
import { motion } from "framer-motion";

interface ChatContainerProps {
  messages: Message[];
  showFilePreview: boolean;
  generatedFileContent: string | null;
  setShowFilePreview: (show: boolean) => void;
  onSendMessage: (content: string) => void;
}

export const ChatContainer = ({
  messages,
  showFilePreview,
  generatedFileContent,
  setShowFilePreview,
  onSendMessage,
}: ChatContainerProps) => {
  return (
    <ScrollArea className="flex-1">
      <div className="p-4 space-y-4">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Welcome to AI Assistant! 👋</h3>
              <p className="text-muted-foreground">
                Try these commands to get started:
              </p>
            </div>
            <ExamplePrompts onSelectPrompt={(prompt) => onSendMessage(prompt)} />
          </motion.div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
          </div>
        )}
      </div>
      {showFilePreview && generatedFileContent && (
        <FilePreview
          content={generatedFileContent}
          showPreview={showFilePreview}
          onTogglePreview={() => setShowFilePreview(!showFilePreview)}
        />
      )}
    </ScrollArea>
  );
};