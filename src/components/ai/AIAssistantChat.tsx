import { useState, useEffect } from "react";
import { ChatInput } from "./chat/ChatInput";
import { ChatHeader } from "./chat/ChatHeader";
import { ChatContainer } from "./chat/ChatContainer";
import { RepositorySection } from "./chat/RepositorySection";
import { Message, Repository } from "./types";
import { AIResponse } from "./types/ai-types";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from '@supabase/auth-helpers-react';
import { SOLVER_SYSTEM_MESSAGE } from "./constants/ai-messages";

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
  const [showFilePreview, setShowFilePreview] = useState(false);
  const [generatedFileContent, setGeneratedFileContent] = useState<string | null>(null);
  const [isSelectionOpen, setIsSelectionOpen] = useState(true);
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

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    if (!session) {
      toast.error("Please log in to use the AI assistant");
      return;
    }

    const userMessage: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      if (content.startsWith("ADD SOLVER") && selectedRepo && generatedFileContent) {
        const { data, error } = await supabase.functions.invoke<AIResponse>('chat-completion', {
          body: { 
            messages: [
              ...messages, 
              userMessage,
              {
                role: "system",
                content: SOLVER_SYSTEM_MESSAGE(generatedFileContent)
              }
            ],
            command: "ADD_SOLVER",
            fileContent: generatedFileContent
          }
        });

        if (error) throw error;
        if (!data?.content) throw new Error("Invalid response from chat completion");

        const assistantMessage: Message = {
          role: "assistant",
          content: data.content
        };
        
        setMessages((prev) => [...prev, assistantMessage]);
        setShowFilePreview(true);
        toast.success("Solver analysis completed");
      } else {
        const { data, error } = await supabase.functions.invoke<AIResponse>('chat-completion', {
          body: { messages: [...messages, userMessage] }
        });

        if (error) throw error;
        if (!data?.content) throw new Error("Invalid response from chat completion");

        const assistantMessage: Message = {
          role: "assistant",
          content: data.content
        };
        
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to get AI response");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <ChatHeader selectedFile={selectedFile} selectedRepo={selectedRepo?.name} />
      
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          <RepositorySection
            isSelectionOpen={isSelectionOpen}
            setIsSelectionOpen={setIsSelectionOpen}
            repositories={repositories}
            selectedRepo={selectedRepo}
            fileStructure={fileStructure}
            onRepoSelect={handleRepoSelect}
            onFileSelect={handleFileSelect}
          />

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
            placeholder="Type 'ADD_SOLVER' to create a solver, or ask for help..."
          />
        </div>
      </div>
    </div>
  );
};