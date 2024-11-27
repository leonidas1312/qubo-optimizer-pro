import { ReactNode, useState } from "react"
import { NewSidebar } from "@/components/layout/NewSidebar"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

interface DashboardLayoutProps {
  children: ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <div className={`fixed inset-0 bg-background/80 backdrop-blur-sm transition-all duration-300 ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} />
      <div className={`fixed left-0 top-0 h-full transition-transform duration-300 ease-in-out z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <NewSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>
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