import { RepositorySidebar } from "@/components/solver/sidebar/RepositorySidebar";
import { useQuery } from "@tanstack/react-query";

interface Repository {
  owner: string;
  name: string;
}

interface AIAssistantSidebarProps {
  onFileSelect: (path: string, repo: Repository) => void;
}

export const AIAssistantSidebar = ({ onFileSelect }: AIAssistantSidebarProps) => {
  const { data: repositories } = useQuery({
    queryKey: ['repositories'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8000/api/github/repos', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch repositories');
      return response.json();
    },
  });

  return (
    <RepositorySidebar
      files={repositories || []}
      onFileSelect={onFileSelect}
      selectedFile={null}
      className="border-r border-white/10"
    />
  );
};