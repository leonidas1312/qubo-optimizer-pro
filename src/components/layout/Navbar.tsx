import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code2, BarChart2, Settings } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">QUBOt</span>
        </Link>
        <div className="flex items-center space-x-6 ml-8">
          <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Link to="/solvers" className="text-muted-foreground hover:text-foreground transition-colors">
            Solvers
          </Link>
          <Link to="/examples" className="text-muted-foreground hover:text-foreground transition-colors">
            Examples
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button>Get Started</Button>
        </div>
      </div>
    </nav>
  );
};