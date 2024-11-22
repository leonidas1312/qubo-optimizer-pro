import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code2, Settings, LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, user, login, logout } = useAuth();

  const handleSettings = () => {
    toast({
      title: "Settings",
      description: "Settings panel coming soon!",
    });
  };

  const handleAuth = () => {
    if (isAuthenticated) {
      logout();
    } else {
      login();
    }
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">QUBOt</span>
        </Link>
        <div className="flex items-center space-x-6 ml-8">
          <Link to="/playground" className="text-muted-foreground hover:text-foreground transition-colors">
            Playground
          </Link>
          <Link to="/solvers" className="text-muted-foreground hover:text-foreground transition-colors">
            Documentation
          </Link>
          <Link to="/uploadalgos" className="text-muted-foreground hover:text-foreground transition-colors">
            Workspace
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={handleSettings}>
            <Settings className="h-5 w-5" />
          </Button>
          <Button onClick={handleAuth} className="flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </>
            ) : (
              'Login with Github'
            )}
          </Button>
          {isAuthenticated && (
            <span className="text-sm text-muted-foreground">
              {user?.login}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};