import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AIAssistantChat } from "@/components/ai/AIAssistantChat";
import { AIAssistantSidebar } from "@/components/ai/AIAssistantSidebar";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AIAssistant = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>("");

  const handleFileSelect = async (path: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/github/repos/${selectedRepo?.owner}/${selectedRepo?.name}/contents/${path}`,
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