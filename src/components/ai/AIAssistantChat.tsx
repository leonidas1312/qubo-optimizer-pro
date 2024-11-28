import { useState, useEffect } from "react";
import { ChatInput } from "./chat/ChatInput";
import { ChatHeader } from "./chat/ChatHeader";
import { Message, Repository } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from '@supabase/auth-helpers-react';
import { toast } from "sonner";
import { RepositorySection } from "./chat/RepositorySection";
import { ChatSection } from "./chat/ChatSection";

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
  const [isSelectionOpen, setIsSelectionOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState<string>("");
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
      if (!selectedRepo) return;
      const response = await fetch(
        `http://localhost:8000/api/github/repos/${selectedRepo.owner.login}/${selectedRepo.name}/contents/${path}`,
        { credentials: 'include' }
      );
      if (!response.ok) throw new Error('Failed to fetch file content');
      const data = await response.json();
      const content = atob(data.content);
      toast.success('File loaded successfully');
    } catch (error) {
      toast.error('Failed to load file content');
      console.error('Error fetching file content:', error);
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
    setCurrentStep("Creating assistant...");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ai-assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          fileContent
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response stream available');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = new TextDecoder().decode(value);
        const data = JSON.parse(text);

        if (data.status === 'completed') {
          const assistantMessage: Message = {
            role: "assistant",
            content: data.content
          };
          setMessages((prev) => [...prev, assistantMessage]);
          break;
        } else {
          setCurrentStep(data.step || "Processing...");
        }
      }

    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to get AI response");
    } finally {
      setIsLoading(false);
      setCurrentStep("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <ChatHeader selectedFile={selectedFile} selectedRepo={selectedRepo?.name} />
      
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          <RepositorySection
            repositories={repositories}
            selectedRepo={selectedRepo}
            fileStructure={fileStructure}
            isSelectionOpen={isSelectionOpen}
            onSelectRepository={handleRepoSelect}
            onFileSelect={handleFileSelect}
            onOpenChange={setIsSelectionOpen}
          />

          <ChatSection
            messages={messages}
            isLoading={isLoading}
            currentStep={currentStep}
            onSelectPrompt={handleSendMessage}
          />

          <ChatInput
            onSend={handleSendMessage}
            isLoading={isLoading}
            placeholder="Ask me anything about the code..."
          />
        </div>
      </div>
    </div>
  );
};