import { ReactNode } from "react";
import { CustomNavigationMenu } from "@/components/layout/NavigationMenu";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <CustomNavigationMenu />
      </header>

      {/* Main Content */}
      <main className="flex-grow mt-16">{children}</main>

      {/* Footer (Optional) */}
      <footer className="bg-background border-t border-border">
        {/* Footer content */}
      </footer>
    </div>
  );
};