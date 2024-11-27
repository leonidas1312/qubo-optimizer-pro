interface ChatHeaderProps {
  selectedFile: string | null;
}

export const ChatHeader = ({ selectedFile }: ChatHeaderProps) => {
  return (
    <div className="p-4 border-b border-white/10">
      <h2 className="text-xl font-semibold">AI Assistant</h2>
      <p className="text-sm text-muted-foreground">
        {selectedFile 
          ? `Discussing: ${selectedFile}`
          : "I'll help you create and optimize your QUBOts"
        }
      </p>
    </div>
  );
};