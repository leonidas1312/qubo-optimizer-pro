import {
  Bot,
  Database,
  Cpu,
  Activity,
  CreditCard,
  BookOpen,
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