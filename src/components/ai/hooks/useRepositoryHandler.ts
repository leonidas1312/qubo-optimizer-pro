import { useState } from "react";
import { Repository } from "../types";
import { toast } from "sonner";

export const useRepositoryHandler = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [fileStructure, setFileStructure] = useState<any[]>([]);
  const [isSelectionOpen, setIsSelectionOpen] = useState(true);
  const [generatedFileContent, setGeneratedFileContent] = useState<string | null>(null);
  const [showFilePreview, setShowFilePreview] = useState(false);

  const handleRepoSelect = async (repo: Repository) => {
    try {
      setSelectedRepo(repo);
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

  return {
    repositories,
    setRepositories,
    selectedRepo,
    setSelectedRepo,
    fileStructure,
    setFileStructure,
    isSelectionOpen,
    setIsSelectionOpen,
    generatedFileContent,
    setGeneratedFileContent,
    showFilePreview,
    setShowFilePreview,
    handleRepoSelect,
    handleFileSelect,
  };
};