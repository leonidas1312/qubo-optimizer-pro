import { useState } from "react";
import { BlockCanvas } from "./BlockCanvas";
import { BlockPalette } from "./BlockPalette";
import { ViewToggle } from "./ViewToggle";
import { CodePreview } from "./CodePreview";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export const BlockEditor = () => {
  const [viewMode, setViewMode] = useState<"visual" | "code">("visual");
  const [connections, setConnections] = useState<any[]>([]);
  const session = useSession();

  const handleSaveConnection = async () => {
    if (!session) {
      toast.error("Please sign in to save connections");
      return;
    }

    try {
      const { error } = await supabase.from("block_connections").insert({
        creator_id: session.user.id,
        name: "New Connection",
        configuration: {
          connections,
        },
      });

      if (error) throw error;
      toast.success("Connection saved successfully");
    } catch (error) {
      console.error("Error saving connection:", error);
      toast.error("Failed to save connection");
    }
  };

  return (
    <div className="h-full flex flex-col gap-6 p-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <ViewToggle currentView={viewMode} onViewChange={setViewMode} />
        <Button
          onClick={handleSaveConnection}
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:opacity-90 transition-opacity"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Connection
        </Button>
      </div>

      {viewMode === "visual" ? (
        <div className="flex-1 flex gap-6">
          <BlockPalette />
          <BlockCanvas connections={connections} setConnections={setConnections} />
        </div>
      ) : (
        <CodePreview connections={connections} />
      )}
    </div>
  );
};