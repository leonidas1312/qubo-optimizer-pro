import { Card } from "@/components/ui/card";
import { Star, GitFork, Clock, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  language: string;
}

interface RepositoryGridProps {
  repositories: Repository[];
  onAddFileStructure: (repo: Repository) => void;
}

export const RepositoryGrid = ({ repositories, onAddFileStructure }: RepositoryGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 8;
  const totalPages = Math.ceil(repositories.length / reposPerPage);

  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const currentRepos = repositories.slice(
    (currentPage - 1) * reposPerPage,
    currentPage * reposPerPage
  );

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1">
        <div className="space-y-2 p-2">
          {currentRepos.map((repo) => (
            <Card key={repo.id} className="p-4 hover:bg-accent transition-colors relative">
              <button
                onClick={() => onAddFileStructure(repo)}
                className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600"
              >
                <Plus className="h-4 w-4" />
              </button>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors text-blue-600 font-semibold"
                  >
                    {repo.name}
                  </a>
                  {repo.language && (
                    <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                      {repo.language}
                    </span>
                  )}
                </div>

                {repo.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {repo.description}
                  </p>
                )}

                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 mr-1" />
                    {repo.stargazers_count}
                  </div>
                  <div className="flex items-center">
                    <GitFork className="h-3 w-3 mr-1" />
                    {repo.forks_count}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true })}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <div className="flex justify-between items-center p-2 border-t">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="p-2 bg-muted rounded disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="p-2 bg-muted rounded disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};