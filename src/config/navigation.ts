import {
  BookOpen,
  Bot,
  Settings2,
  SquareTerminal,
  Frame,
  PieChart,
  Map,
} from "lucide-react"

export const navigationData = {
  user: {
    name: "",
    email: "",
    avatar: "",
  },
  navMain: [
    {
      title: "Playground",
      url: "/playground",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Create New",
          url: "/playground",
        },
        {
          title: "My Solutions",
          url: "/playground/solutions",
        },
      ],
    },
    {
      title: "QUBOts",
      url: "/qubots",
      icon: Bot,
      items: [
        {
          title: "My QUBOts",
          url: "/qubots",
        },
        {
          title: "Create New",
          url: "/qubots/new",
        },
      ],
    },
    {
      title: "Resources",
      url: "/docs",
      icon: BookOpen,
      items: [
        {
          title: "Solvers",
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
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "Profile",
          url: "/settings/profile",
        },
        {
          title: "Preferences",
          url: "/settings/preferences",
        },
      ],
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