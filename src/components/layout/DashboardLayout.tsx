import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar className="fixed left-0 top-0 z-30 h-screen transition-all duration-300" />
      <main className="flex-1 transition-all duration-300 pl-16 lg:pl-64 min-h-screen w-full data-[sidebar-collapsed=true]:pl-16">
        <div className="container mx-auto p-8 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
};