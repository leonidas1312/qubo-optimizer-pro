import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCollaboration } from "@/contexts/CollaborationContext";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Users, Link, Copy } from "lucide-react";

export const CollaborationPanel = () => {
  const { isConnected, roomId, joinRoom, leaveRoom, shareableLink } = useCollaboration();
  const [newRoomId, setNewRoomId] = useState("");
  const { toast } = useToast();

  const handleJoinRoom = () => {
    if (newRoomId.trim()) {
      joinRoom(newRoomId.trim());
    }
  };

  const handleCopyLink = () => {
    if (shareableLink) {
      navigator.clipboard.writeText(shareableLink);
      toast({
        title: "Link copied",
        description: "Shareable link has been copied to clipboard",
      });
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-background">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Collaboration</h3>
      </div>

      {isConnected ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm">Connected to room: {roomId}</span>
          </div>
          <div className="flex gap-2">
            <Input
              value={shareableLink || ""}
              readOnly
              className="flex-1"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopyLink}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="destructive"
            onClick={leaveRoom}
            className="w-full"
          >
            Leave Room
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Enter room ID"
              value={newRoomId}
              onChange={(e) => setNewRoomId(e.target.value)}
            />
            <Button onClick={handleJoinRoom}>
              Join
            </Button>
          </div>
          <Button
            variant="outline"
            onClick={() => joinRoom(crypto.randomUUID())}
            className="w-full"
          >
            Create New Room
          </Button>
        </div>
      )}
    </div>
  );
};