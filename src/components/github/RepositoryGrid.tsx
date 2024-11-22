import { Card } from "@/components/ui/card";
import { Star, GitFork, Clock, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

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
  onAddFileStructure: (repo: Repository) => void; // Callback for adding file structure
}

export const RepositoryGrid = ({ repositories, onAddFileStructure }: RepositoryGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 6;

  const totalPages = Math.ceil(repositories.length / reposPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const currentRepos = repositories.slice(
    (currentPage - 1) * reposPerPage,
    currentPage * reposPerPage
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentRepos.map((repo) => (
          <Card key={repo.id} className="p-6 hover:shadow-lg transition-shadow relative">
            {/* + Button to Add File Structure */}
            <button
              onClick={() => onAddFileStructure(repo)}
              className="absolute top-2 left-2 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600"
            >
              <Plus className="h-4 w-4" />
            </button>

            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors text-blue-600 font-semibold text-lg"
                >
                  {repo.name}
                </a>
                {repo.language && (
                  <span className="text-sm text-black px-2 py-1 bg-secondary rounded-full">
                    {repo.language}
                  </span>
                )}
              </div>

              {repo.description && (
                <p className="text-sm text-muted-foreground">
                  {repo.description}
                </p>
              )}

              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  {repo.stargazers_count}
                </div>
                <div className="flex items-center">
                  <GitFork className="h-4 w-4 mr-1" />
                  {repo.forks_count}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true })}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="p-2 bg-gray-200 rounded disabled:opacity-50"
        >
          <ChevronLeft className="h-5 w-5 text-black" />
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="p-2 bg-gray-200 rounded disabled:opacity-50"
        >
          <ChevronRight className="h-5 w-5 text-black" />
        </button>
      </div>
    </div>
  );
};
