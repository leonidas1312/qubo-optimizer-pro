import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send, MoreVertical } from "lucide-react";
import { ChatInputProps } from "../types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export const ChatInput = ({ onSend, isLoading, placeholder }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSend(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'playground':
        toast.info("Moving to playground...");
        // TODO: Implement playground navigation
        break;
      case 'save-solver':
        toast.info("Saving as solver...");
        // TODO: Implement solver saving
        break;
      case 'save-dataset':
        toast.info("Saving as dataset...");
        // TODO: Implement dataset saving
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sticky bottom-0 bg-background p-4 border-t">
      <div className="relative">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="min-h-[60px] pr-24"
        />
        <div className="absolute right-2 bottom-2 flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleAction('playground')}>
                Move to Playground
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('save-solver')}>
                Save as Solver
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction('save-dataset')}>
                Save as Dataset
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button 
            type="submit" 
            size="icon"
            disabled={isLoading}
            className="h-8 w-8"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};