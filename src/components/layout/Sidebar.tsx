import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { navigation } from "@/config/navigation";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function Sidebar({ className }: { className?: string }) {
  const [expanded, setExpanded] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <div
      className={cn(
        "relative flex flex-col border-r bg-background transition-all duration-300",
        expanded ? "w-64" : "w-16",
        className
      )}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {expanded && (
          <Link to="/" className="font-bold text-xl hover:text-primary transition-colors">
            CEPTUM
          </Link>
        )}
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2 p-2">
          {navigation.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                location.pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground",
                !expanded && "justify-center px-2"
              )}
            >
              <item.icon className="h-4 w-4" />
              {expanded && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="border-t p-2">
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center rounded-lg px-3 py-2 text-sm transition-colors",
            "hover:bg-accent hover:text-accent-foreground text-muted-foreground",
            !expanded && "justify-center px-2"
          )}
        >
          <LogOut className="h-4 w-4" />
          {expanded && <span className="ml-2">Logout</span>}
        </button>
      </div>
    </div>
  );
}