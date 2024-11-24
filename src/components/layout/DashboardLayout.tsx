import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { CustomNavigationMenu } from "@/components/layout/NavigationMenu";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          {/* Navigation Menu */}
          <CustomNavigationMenu />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer (Optional) */}
      <footer className="bg-background border-t border-border">
        {/* Footer content */}
      </footer>
    </div>
  );
};