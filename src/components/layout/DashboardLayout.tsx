import { ReactNode } from "react"
import { NewSidebar } from "@/components/layout/NewSidebar"

interface DashboardLayoutProps {
  children: ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <NewSidebar />
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  )
}