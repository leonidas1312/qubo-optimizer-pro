import {
  Code2,
  Upload,
  Database,
  Cpu,
  Activity,
  CreditCard,
  Settings2,
  BookOpen,
  Bot,
  SquareTerminal,
  Frame,
  PieChart,
  Map,
} from "lucide-react"

export const navigationData = {
  navMain: [
    {
      title: "AI Assistant",
      url: "/ai-assistant",
      icon: Bot,
      description: "Create QUBOts with AI help",
    },
    {
      title: "Solvers",
      url: "/solvers",
      icon: Code2,
      description: "Create and manage optimization solvers",
    },
    {
      title: "Datasets",
      url: "/datasets",
      icon: Database,
      description: "Manage your QUBO problem datasets",
    },
    {
      title: "Hardware",
      url: "/hardware",
      icon: Cpu,
      description: "Configure computing resources",
    },
    {
      title: "Jobs",
      url: "/jobs",
      icon: Activity,
      description: "Monitor your optimization tasks",
    },
    {
      title: "Billing",
      url: "/billing",
      icon: CreditCard,
      description: "Manage your usage and payments",
    },
    {
      title: "Documentation",
      url: "/docs",
      icon: BookOpen,
      description: "Learn how to use the platform",
    },
  ],
  projects: [
    {
      name: "Recent Solvers",
      url: "/solvers",
      icon: Frame,
    },
    {
      name: "Analytics",
      url: "/analytics",
      icon: PieChart,
    },
    {
      name: "Hardware Map",
      url: "/hardware",
      icon: Map,
    },
  ],
}
