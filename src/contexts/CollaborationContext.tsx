import { createContext, useContext, useEffect, useState } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { useToast } from "@/components/ui/use-toast";

interface CollaborationContextType {
  isConnected: boolean;
  roomId: string | null;
  joinRoom: (id: string) => void;
  leaveRoom: () => void;
  shareableLink: string | null;
}

const CollaborationContext = createContext<CollaborationContextType | null>(null);

export const CollaborationProvider = ({ children }: { children: React.ReactNode }) => {
  const [doc, setDoc] = useState<Y.Doc | null>(null);
  const [provider, setProvider] = useState<WebsocketProvider | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const joinRoom = (id: string) => {
    if (doc) {
      doc.destroy();
    }

    const newDoc = new Y.Doc();
    const newProvider = new WebsocketProvider(
      'ws://localhost:1234', // Replace with your WebSocket server URL
      id,
      newDoc
    );

    newProvider.on('status', ({ status }: { status: string }) => {
      setIsConnected(status === 'connected');
      if (status === 'connected') {
        toast({
          title: "Connected to collaboration room",
          description: "You can now collaborate with others in real-time.",
        });
      }
    });

    setDoc(newDoc);
    setProvider(newProvider);
    setRoomId(id);
  };

  const leaveRoom = () => {
    if (provider) {
      provider.destroy();
    }
    if (doc) {
      doc.destroy();
    }
    setDoc(null);
    setProvider(null);
    setRoomId(null);
    setIsConnected(false);
  };

  const shareableLink = roomId 
    ? `${window.location.origin}/playground?room=${roomId}`
    : null;

  useEffect(() => {
    // Check URL for room parameter
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get('room');
    if (roomParam) {
      joinRoom(roomParam);
    }

    return () => {
      leaveRoom();
    };
  }, []);

  return (
    <CollaborationContext.Provider 
      value={{ 
        isConnected, 
        roomId, 
        joinRoom, 
        leaveRoom, 
        shareableLink 
      }}
    >
      {children}
    </CollaborationContext.Provider>
  );
};

export const useCollaboration = () => {
  const context = useContext(CollaborationContext);
  if (!context) {
    throw new Error('useCollaboration must be used within a CollaborationProvider');
  }
  return context;
};