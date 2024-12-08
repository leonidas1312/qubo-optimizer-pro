import { useEffect } from "react";
import { ChatInput } from "./chat/ChatInput";
import { ChatHeader } from "./chat/ChatHeader";
import { ChatContainer } from "./chat/ChatContainer";
import { RepositorySection } from "./chat/RepositorySection";
import { TransformedCode } from "./chat/TransformedCode";
import { Repository } from "./types";
import { toast } from "sonner";
import { useCommandHandler } from "./hooks/useCommandHandler";
import { useRepositoryHandler } from "./hooks/useRepositoryHandler";
import { useCodeTransformation } from "./hooks/useCodeTransformation";

interface AIAssistantChatProps {
  selectedFile: string | null;
  fileContent: string;
  onSelectRepository: (repo: Repository) => void;
}

export const AIAssistantChat = ({ selectedFile, fileContent, onSelectRepository }: AIAssistantChatProps) => {
  const {
    activeCommand,
    setActiveCommand,
    messages,
    setMessages,
    isLoading,
    transformedCode,
    setTransformedCode,
    handleSendMessage,
  } = useCommandHandler();

  const {
    repositories,
    setRepositories,
    selectedRepo,
    fileStructure,
    isSelectionOpen,
    setIsSelectionOpen,
    generatedFileContent,
    showFilePreview,
    setShowFilePreview,
    handleRepoSelect,
    handleFileSelect,
  } = useRepositoryHandler();

  const {
    handleFinalize,
    handleApproveChanges,
  } = useCodeTransformation(messages, setMessages);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/github/repos", {
          credentials: 'include'
        });
        if (!response.ok) throw new Error("Failed to fetch repositories");
        const data = await response.json();
        setRepositories(data);
      } catch (error) {
        toast.error("Error fetching repositories");
        console.error("Error fetching repositories:", error);
      }
    };
    fetchRepositories();
  }, []);

  const handleFinalizeWrapper = async () => {
    const transformed = await handleFinalize(generatedFileContent);
    if (transformed) {
      setTransformedCode(transformed);
    }
  };

  const handleApproveChangesWrapper = async () => {
    await handleApproveChanges(transformedCode, selectedFile);
    setActiveCommand(null);
    setTransformedCode(null);
  };

  return (
    <div className="flex h-full bg-background">
      <div className="w-[30%] border-r border-border flex flex-col">
        <ChatHeader selectedFile={selectedFile} selectedRepo={selectedRepo?.name} />
        <ChatContainer
          messages={messages}
          showFilePreview={showFilePreview}
          generatedFileContent={generatedFileContent}
          setShowFilePreview={setShowFilePreview}
          onSendMessage={handleSendMessage}
        />
        <ChatInput
          onSend={handleSendMessage}
          isLoading={isLoading}
          placeholder="Type a command or ask for help..."
        />
      </div>

      <div className="w-[70%] flex flex-col">
        {activeCommand === 'ADD_SOLVER' && !transformedCode && (
          <RepositorySection
            repositories={repositories}
            selectedRepo={selectedRepo}
            fileStructure={fileStructure}
            onRepoSelect={handleRepoSelect}
            onFileSelect={handleFileSelect}
            isSelectionOpen={isSelectionOpen}
            setIsSelectionOpen={setIsSelectionOpen}
            onFinalize={handleFinalizeWrapper}
          />
        )}
        {activeCommand === 'ADD_SOLVER' && transformedCode && (
          <TransformedCode
            code={transformedCode}
            onApprove={handleApproveChangesWrapper}
          />
        )}
        {activeCommand === 'ADD_DATASET' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Upload Dataset</h2>
            <p className="text-muted-foreground">
              Upload your QUBO matrix file (.npy or .xlsx)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};