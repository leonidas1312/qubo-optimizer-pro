import { useState } from "react";
import { BlockCanvas } from "./BlockCanvas";
import { BlockPalette } from "./BlockPalette";
import { ViewToggle } from "./ViewToggle";
import { CodePreview } from "./CodePreview";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
    <div className="h-full flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <ViewToggle currentView={viewMode} onViewChange={setViewMode} />
        <button
          onClick={handleSaveConnection}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
        >
          Save Connection
        </button>
      </div>

      {viewMode === "visual" ? (
        <div className="flex-1 flex gap-4">
          <BlockPalette />
          <BlockCanvas connections={connections} setConnections={setConnections} />
        </div>
      ) : (
        <CodePreview connections={connections} />
      )}
    </div>
  );
};