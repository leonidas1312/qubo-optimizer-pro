import { ReactNode, useState, useRef, useEffect } from "react"
import { NewSidebar } from "@/components/layout/NewSidebar"
import { Button } from "@/components/ui/button"
import { ToggleRight } from "lucide-react"

interface DashboardLayoutProps {
  children: ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="flex min-h-screen">
      <div className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-all duration-300 ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} />
      <div ref={sidebarRef} className={`fixed left-0 top-0 h-full transition-transform duration-300 ease-in-out z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <NewSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>
      <main className="flex-1 overflow-y-auto p-8">
        {!isSidebarOpen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
            className="fixed top-4 left-4 z-50 hover:bg-white/5"
          >
            <ToggleRight className="h-6 w-6 text-white" />
          </Button>
        )}
        {children}
      </main>
    </div>
  )
}