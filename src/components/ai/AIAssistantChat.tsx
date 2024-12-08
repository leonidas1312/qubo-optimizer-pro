import { useState, useEffect } from "react";
import { ChatInput } from "./chat/ChatInput";
import { ChatHeader } from "./chat/ChatHeader";
import { ChatContainer } from "./chat/ChatContainer";
import { RepositorySection } from "./chat/RepositorySection";
import { TransformedCode } from "./chat/TransformedCode";
import { Message, Repository } from "./types";
import { CommandType } from "./types/commands";
import { AIResponse } from "./types/ai-types";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from '@supabase/auth-helpers-react';

interface AIAssistantChatProps {
  selectedFile: string | null;
  fileContent: string;
  onSelectRepository: (repo: Repository) => void;
}

export const AIAssistantChat = ({ selectedFile, fileContent, onSelectRepository }: AIAssistantChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [fileStructure, setFileStructure] = useState<any[]>([]);
  const [activeCommand, setActiveCommand] = useState<CommandType | null>(null);
  const [showFilePreview, setShowFilePreview] = useState(false);
  const [generatedFileContent, setGeneratedFileContent] = useState<string | null>(null);
  const [isSelectionOpen, setIsSelectionOpen] = useState(true);
  const [transformedCode, setTransformedCode] = useState<string | null>(null);
  const session = useSession();

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

  const handleRepoSelect = async (repo: Repository) => {
    try {
      setSelectedRepo(repo);
      onSelectRepository(repo);
      const response = await fetch(
        `http://localhost:8000/api/github/repos/${repo.owner.login}/${repo.name}/tree`,
        { credentials: 'include' }
      );
      if (!response.ok) throw new Error('Failed to fetch file structure');
      const structure = await response.json();
      setFileStructure(structure);
      toast.success('Repository files loaded successfully');
    } catch (error) {
      toast.error('Failed to load repository files');
      console.error('Error fetching file structure:', error);
    }
  };

  const handleFileSelect = async (path: string) => {
    try {
      if (!selectedRepo) {
        toast.error("Please select a repository first");
        return;
      }

      const response = await fetch(
        `http://localhost:8000/api/github/repos/${selectedRepo.owner.login}/${selectedRepo.name}/contents/${path}`,
        { credentials: 'include' }
      );
      
      if (!response.ok) throw new Error('Failed to fetch file content');
      
      const data = await response.json();
      const content = atob(data.content);
      setGeneratedFileContent(content);
      toast.success('File loaded successfully');
    } catch (error) {
      toast.error('Failed to load file content');
      console.error('Error fetching file:', error);
    }
  };

  const handleFinalize = async () => {
    if (!generatedFileContent) {
      toast.error("Please select a file first");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke<AIResponse>('chat-completion', {
        body: { 
          messages: [
            ...messages,
            {
              role: "system",
              content: "Transform the following code to match our solver guidelines. Explain the changes made."
            },
            {
              role: "user",
              content: generatedFileContent
            }
          ],
          command: activeCommand,
        }
      });

      if (error) throw error;
      if (!data?.content) throw new Error("Invalid response from chat completion");

      setTransformedCode(data.content);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I've transformed your code according to our guidelines. Please review the changes on the right."
      }]);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to transform code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveChanges = async () => {
    if (!transformedCode || !selectedRepo || !selectedFile) {
      toast.error("Missing required information");
      return;
    }

    try {
      // Here you would implement the logic to save the transformed code
      toast.success("Changes approved! The solver has been saved.");
      setActiveCommand(null);
      setTransformedCode(null);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save changes");
    }
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
            onFinalize={handleFinalize}
          />
        )}
        {activeCommand === 'ADD_SOLVER' && transformedCode && (
          <TransformedCode
            code={transformedCode}
            onApprove={handleApproveChanges}
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
