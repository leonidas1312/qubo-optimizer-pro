import * as React from "react";
import { Code2, Puzzle, Trophy, Book, Beaker, Cpu, Database } from "lucide-react";
import { NavMain } from "./navigation/NavMain";
import { NavUser } from "./navigation/NavUser";
import { useAuth } from "@/context/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const navItems = [
  {
    title: "Optimization Lab",
    url: "/solvers",
    icon: Puzzle,
    items: [
      {
        title: "Create Solver",
        url: "/solvers",
      },
      {
        title: "Hardware",
        url: "/hardware",
      },
      {
        title: "Datasets",
        url: "/datasets",
      },
    ],
  },
  {
    title: "Community",
    url: "/qubots",
    icon: Trophy,
    items: [
      {
        title: "Browse QUBOts",
        url: "/qubots",
      },
      {
        title: "Leaderboard",
        url: "/leaderboard",
      },
    ],
  },
  {
    title: "Documentation",
    url: "/docs",
    icon: Book,
    items: [
      {
        title: "Introduction",
        url: "/docs/introduction",
      },
      {
        title: "Getting Started",
        url: "/docs/getting-started",
      },
      {
        title: "API Reference",
        url: "/docs/api",
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">QUBOt</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      {user && (
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  );
}