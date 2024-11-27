import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  placeholder?: string;
}

export const ChatInput = ({ input, setInput, handleSubmit, isLoading, placeholder }: ChatInputProps) => {
  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
      <div className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder || "Ask me anything..."}
          className="min-h-[60px] bg-white/5 border-white/10 resize-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <Button
          type="submit"
          size="icon"
          disabled={isLoading}
          className="h-[60px] w-[60px] bg-blue-600 hover:bg-blue-700"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};