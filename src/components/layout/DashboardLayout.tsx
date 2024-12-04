import { ReactNode } from "react"

interface DashboardLayoutProps {
  children: ReactNode
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
};