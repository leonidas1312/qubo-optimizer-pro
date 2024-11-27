import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AIAssistantChat } from "@/components/ai/AIAssistantChat";
import { AIAssistantSidebar } from "@/components/ai/AIAssistantSidebar";
import { useState } from "react";
import { toast } from "sonner";
import { Repository } from "@/components/ai/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AIAssistant = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [fileStructure, setFileStructure] = useState<any[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleFileSelect = async (path: string) => {
    try {
      if (!selectedRepo) return;
      
      const response = await fetch(
        `http://localhost:8000/api/github/repos/${selectedRepo.owner}/${selectedRepo.name}/contents/${path}`,
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

  const handleSelectRepository = async (repo: Repository) => {
    try {
      setSelectedRepo(repo);
      const response = await fetch(
        `http://localhost:8000/api/github/repos/${repo.owner}/${repo.name}/tree`,
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

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-4rem)] relative">
        <AIAssistantSidebar 
          onFileSelect={handleFileSelect}
          isCollapsed={isSidebarCollapsed}
          fileStructure={fileStructure}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-4 z-50"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
        <div className="flex-1">
          <AIAssistantChat 
            selectedFile={selectedFile} 
            fileContent={fileContent}
            onSelectRepository={handleSelectRepository}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIAssistant;