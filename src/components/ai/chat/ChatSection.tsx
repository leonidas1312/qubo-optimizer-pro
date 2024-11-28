import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "../types";
import { ChatMessage } from "./ChatMessage";
import { ExamplePrompts } from "./ExamplePrompts";
import { AssistantSteps } from "./AssistantSteps";

interface ChatSectionProps {
  messages: Message[];
  isLoading: boolean;
  currentStep: string;
  onSelectPrompt: (prompt: string) => void;
}

export const ChatSection = ({
  messages,
  isLoading,
  currentStep,
  onSelectPrompt,
}: ChatSectionProps) => {
  return (
    <ScrollArea className="flex-1 px-4">
      {messages.length === 0 ? (
        <ExamplePrompts onSelectPrompt={onSelectPrompt} />
      ) : (
        <>
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {isLoading && <AssistantSteps currentStep={currentStep} />}
        </>
      )}
    </ScrollArea>
  );
};