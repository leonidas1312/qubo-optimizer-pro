import { useState } from "react";
import { Message } from "../types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { ExamplePrompts } from "./ExamplePrompts";
import { FilePreview } from "./FilePreview";

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
    <ScrollArea className="flex-1 px-4">
      {messages.length === 0 && (
        <ExamplePrompts onSelectPrompt={(prompt) => onSendMessage(prompt)} />
      )}
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
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