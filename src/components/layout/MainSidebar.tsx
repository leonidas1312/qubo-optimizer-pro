import { Link } from "react-router-dom";
import { Code2, Trophy, Book, Beaker, FileText, Puzzle, Cpu, Database } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { UserMenu } from "./navigation/UserMenu";

export function MainSidebar() {
  const { isAuthenticated, login } = useAuth();

  const handleAuth = async () => {
    if (!isAuthenticated) {
      login();
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-2">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">QUBOt</span>
          </Link>
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Optimization Lab">
              <Puzzle className="h-4 w-4" />
              <span>Optimization Lab</span>
            </SidebarMenuButton>
            <SidebarMenuSub>
              <SidebarMenuSubButton asChild>
                <Link to="/solvers">
                  <Beaker className="h-4 w-4" />
                  <span>Create Solver</span>
                </Link>
              </SidebarMenuSubButton>
              <SidebarMenuSubButton asChild>
                <Link to="/hardware">
                  <Cpu className="h-4 w-4" />
                  <span>Hardware</span>
                </Link>
              </SidebarMenuSubButton>
              <SidebarMenuSubButton asChild>
                <Link to="/datasets">
                  <Database className="h-4 w-4" />
                  <span>Datasets</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSub>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Community">
              <Trophy className="h-4 w-4" />
              <span>Community</span>
            </SidebarMenuButton>
            <SidebarMenuSub>
              <SidebarMenuSubButton asChild>
                <Link to="/qubots">
                  <FileText className="h-4 w-4" />
                  <span>Browse QUBOts</span>
                </Link>
              </SidebarMenuSubButton>
              <SidebarMenuSubButton asChild>
                <Link to="/leaderboard">
                  <Trophy className="h-4 w-4" />
                  <span>Leaderboard</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSub>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Documentation">
              <Book className="h-4 w-4" />
              <span>Documentation</span>
            </SidebarMenuButton>
            <SidebarMenuSub>
              <SidebarMenuSubButton asChild>
                <Link to="/docs/introduction">
                  <span>Introduction</span>
                </Link>
              </SidebarMenuSubButton>
              <SidebarMenuSubButton asChild>
                <Link to="/docs/getting-started">
                  <span>Getting Started</span>
                </Link>
              </SidebarMenuSubButton>
              <SidebarMenuSubButton asChild>
                <Link to="/docs/api">
                  <span>API Reference</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="mt-auto p-4">
          {!isAuthenticated ? (
            <Button
              variant="outline"
              onClick={handleAuth}
              className="w-full text-sm bg-black text-white border-white hover:bg-white hover:text-black transition-colors"
            >
              Log In
            </Button>
          ) : (
            <UserMenu />
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}