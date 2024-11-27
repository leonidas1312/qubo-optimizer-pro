import { ChatHeaderProps } from "../types";

export const ChatHeader = ({ selectedFile }: ChatHeaderProps) => {
  return (
    <div className="border-b p-4">
      <h2 className="text-lg font-semibold">AI Assistant</h2>
      {selectedFile && (
        <p className="text-sm text-muted-foreground mt-1">
          Current file: {selectedFile}
        </p>
      )}
    </div>
  );
};