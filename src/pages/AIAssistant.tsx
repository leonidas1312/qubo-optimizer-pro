import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AIAssistantChat } from "@/components/ai/AIAssistantChat";
import { AIAssistantSidebar } from "@/components/ai/AIAssistantSidebar";
import { useState } from "react";
import { toast } from "sonner";

interface Repository {
  owner: string;
  name: string;
}

const AIAssistant = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);

  const handleFileSelect = async (path: string, repo: Repository) => {
    try {
      setSelectedRepo(repo);
      const response = await fetch(
        `http://localhost:8000/api/github/repos/${repo.owner}/${repo.name}/contents/${path}`,
        { credentials: 'include' }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch file content');
      }
      
      const data = await response.json();
      const content = atob(data.content);
      setFileContent(content);
      setSelectedFile(path);
      toast.success('File loaded successfully');
    } catch (error) {
      toast.error('Failed to load file content');
      console.error('Error fetching file content:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-4rem)]">
        <AIAssistantSidebar onFileSelect={handleFileSelect} />
        <AIAssistantChat selectedFile={selectedFile} fileContent={fileContent} />
      </div>
    </DashboardLayout>
  );
};

export default AIAssistant;