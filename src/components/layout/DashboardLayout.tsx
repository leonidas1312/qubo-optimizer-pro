import { ReactNode, useState } from "react"
import { NewSidebar } from "@/components/layout/NewSidebar"

interface DashboardLayoutProps {
  children: ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen">
      <NewSidebar isOpen={isOpen} onToggle={handleToggle} />
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
};