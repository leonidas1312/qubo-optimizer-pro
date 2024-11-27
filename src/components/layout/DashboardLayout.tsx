import { ReactNode } from "react";
import { MainSidebar } from "@/components/layout/MainSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <MainSidebar />
      <SidebarInset>
        <main className="flex-grow">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};