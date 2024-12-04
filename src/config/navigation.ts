import { LayoutDashboard, Code2, Database, Cpu, Clock, Upload, Bot, Users } from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Public Solvers",
    href: "/public-solvers",
    icon: Users,
  },
  {
    title: "Upload Solver",
    href: "/upload-solver",
    icon: Upload,
  },
  {
    title: "AI Assistant",
    href: "/ai-assistant",
    icon: Bot,
  },
  {
    title: "Documentation",
    href: "/documentation",
    icon: Code2,
  },
  {
    title: "Datasets",
    href: "/datasets",
    icon: Database,
  },
  {
    title: "Hardware",
    href: "/hardware",
    icon: Cpu,
  },
  {
    title: "Jobs",
    href: "/jobs",
    icon: Clock,
  },
];