import { useState, useEffect } from "react";
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
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const ChatInput = ({ onSend, isLoading, placeholder }: ChatInputProps) => {
  const [input, setInput] = useState("");
  const [isCommand, setIsCommand] = useState(false);
  const [showCommandMenu, setShowCommandMenu] = useState(false);

  const COMMANDS = [
    { value: "/add_solver", label: "Add Solver" },
    { value: "/add_dataset", label: "Add Dataset" },
    { value: "/add_hardware", label: "Add Hardware" },
    { value: "/save_solver", label: "Save Solver" },
    { value: "/save_dataset", label: "Save Dataset" },
    { value: "/run", label: "Run" }
  ];

  useEffect(() => {
    const isValidCommand = COMMANDS.some(cmd => input.trim().startsWith(cmd.value));
    setIsCommand(isValidCommand);
    
    // Show command menu when user types '/'
    if (input === '/') {
      setShowCommandMenu(true);
    }
  }, [input]);

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
    } else if (e.key === 'Escape' && showCommandMenu) {
      setShowCommandMenu(false);
    }
  };

  const handleCommandSelect = (command: string) => {
    setInput(command + " ");
    setShowCommandMenu(false);
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'playground':
        toast.info("Moving to playground...");
        break;
      case 'save-solver':
        toast.info("Saving as solver...");
        break;
      case 'save-dataset':
        toast.info("Saving as dataset...");
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
          className={cn(
            "min-h-[60px] pr-24 transition-all duration-300",
            isCommand && "border-2 border-green-500/70 shadow-[0_0_12px_rgba(34,197,94,0.4)] bg-green-500/5"
          )}
        />
        {showCommandMenu && (
          <div className="absolute bottom-full left-0 w-full mb-2">
            <Command className="rounded-lg border shadow-md">
              <CommandInput placeholder="Type a command..." />
              <CommandList>
                <CommandEmpty>No commands found.</CommandEmpty>
                <CommandGroup heading="Available Commands">
                  {COMMANDS.map((cmd) => (
                    <CommandItem
                      key={cmd.value}
                      onSelect={() => handleCommandSelect(cmd.value)}
                      className="cursor-pointer"
                    >
                      {cmd.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        )}
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
            className={cn(
              "h-8 w-8 transition-colors duration-300",
              isCommand ? "bg-green-600 hover:bg-green-700 shadow-[0_0_12px_rgba(34,197,94,0.3)]" : ""
            )}
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