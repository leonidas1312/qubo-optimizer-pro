import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, GitFork, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  language: string | null;
}

interface RepositoryGridProps {
  repositories: Repository[];
  onSelectRepository: (repo: Repository) => void;
}

export const RepositoryGrid = ({ repositories, onSelectRepository }: RepositoryGridProps) => {
  return (
    <div className="p-2 space-y-2">
      {repositories.map((repo) => (
        <HoverCard key={repo.id}>
          <HoverCardTrigger asChild>
            <div
              className="cursor-pointer hover:text-blue-600 font-semibold"
              onClick={() => onSelectRepository(repo)}
            >
              {repo.name}
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex space-x-4">
              <Avatar>
                <AvatarImage src={repo.owner.avatar_url} />
                <AvatarFallback>{repo.owner.login.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">{repo.full_name}</h4>
                {repo.description && (
                  <p className="text-sm text-muted-foreground">{repo.description}</p>
                )}
                <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-2">
                  <div className="flex items-center">
                    <Star className="mr-1 h-4 w-4 opacity-70" />
                    {repo.stargazers_count}
                  </div>
                  <div className="flex items-center">
                    <GitFork className="mr-1 h-4 w-4 opacity-70" />
                    {repo.forks_count}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4 opacity-70" />
                    Updated {formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true })}
                  </div>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
};
