import { ChatHeaderProps } from "../types";

export const ChatHeader = ({ selectedFile, selectedRepo }: ChatHeaderProps) => {
  return (
    <div className="border-b p-4">
      <h2 className="text-lg font-semibold">AI Assistant</h2>
      <div className="space-y-1 mt-1">
        {selectedRepo && (
          <p className="text-sm text-muted-foreground">
            Repository: {selectedRepo}
          </p>
        )}
        {selectedFile && (
          <p className="text-sm text-muted-foreground">
            File: {selectedFile}
          </p>
        )}
      </div>
    </div>
  );
};