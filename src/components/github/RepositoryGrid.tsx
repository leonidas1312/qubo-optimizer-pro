import { Card } from "@/components/ui/card";
import { Star, GitFork, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

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
}

export const RepositoryGrid = ({ repositories }: RepositoryGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repositories.map((repo) => (
        <Card key={repo.id} className="p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-lg truncate">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {repo.name}
                </a>
              </h3>
              {repo.language && (
                <span className="text-sm text-muted-foreground px-2 py-1 bg-secondary rounded-full">
                  {repo.language}
                </span>
              )}
            </div>
<<<<<<< HEAD

=======
            
>>>>>>> 912d1ae3b410df385a30f91d5fe9450b939af98a
            {repo.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
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
  );
};