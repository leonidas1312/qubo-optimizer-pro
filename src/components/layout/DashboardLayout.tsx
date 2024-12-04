import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar className="fixed left-0 top-0 z-30 h-screen" />
      <main className="flex-1 ml-16 lg:ml-64 p-8">
        {children}
      </main>
    </div>
  );
};