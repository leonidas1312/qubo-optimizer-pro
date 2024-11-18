import { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        {children}
      </main>
    </div>
  );
};