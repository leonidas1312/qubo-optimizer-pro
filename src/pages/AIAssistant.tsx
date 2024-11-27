import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AIAssistantChat } from "@/components/ai/AIAssistantChat";
import { AIAssistantSidebar } from "@/components/ai/AIAssistantSidebar";

const AIAssistant = () => {
  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-4rem)]">
        <AIAssistantSidebar />
        <AIAssistantChat />
      </div>
    </DashboardLayout>
  );
};

export default AIAssistant;