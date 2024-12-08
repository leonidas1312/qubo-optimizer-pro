import { Bot, Server } from "lucide-react";
import { ChatHeaderProps } from "../types";

export const ChatHeader = ({ selectedFile, selectedRepo }: ChatHeaderProps) => {
  return (
    <div className="border-b bg-card/50 backdrop-blur-sm p-4">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
          <Bot className="h-5 w-5 text-purple-500" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">AI Assistant</h2>
          <p className="text-sm text-muted-foreground">
            Ask questions about your code or get help with implementation
          </p>
        </div>
      </div>
      {(selectedRepo || selectedFile) && (
        <div className="mt-3 space-y-1 text-sm">
          {selectedRepo && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Server className="h-4 w-4" />
              <span>Repository: {selectedRepo}</span>
            </div>
          )}
          {selectedFile && (
            <p className="text-muted-foreground ml-6">
              File: {selectedFile}
            </p>
          )}
        </div>
      )}
    </div>
  );
};