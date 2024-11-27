import { ReactNode, useState } from "react"
import { NewSidebar } from "@/components/layout/NewSidebar"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

interface DashboardLayoutProps {
  children: ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen">
      {isSidebarOpen && <NewSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />}
      <main className="flex-1 overflow-y-auto p-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 left-4 z-50"
        >
          <Menu className="h-4 w-4" />
        </Button>
        {children}
      </main>
    </div>
  )
}