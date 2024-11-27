import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Message {
  role: "assistant" | "user";
  content: string;
}

interface AIAssistantChatProps {
  selectedFile?: string | null;
  fileContent?: string;
}

export const AIAssistantChat = ({ selectedFile, fileContent }: AIAssistantChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeRole, setActiveRole] = useState<'analyzer' | 'modifier' | 'communicator'>('communicator');
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error('Not authenticated');
      }

      const { data: { url } } = await supabase.functions.invoke('ai-assistant', {
        body: {
          messages: [...messages, userMessage],
          fileContent: fileContent,
          role: activeRole,
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          fileContent: fileContent,
          role: activeRole,
        }),
      });

      if (!response.body) {
        throw new Error('Invalid response from AI service');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(5).trim();
            
            // Skip the [DONE] message
            if (data === '[DONE]') continue;
            
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content || '';
              assistantMessage += content;
              
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].content = assistantMessage;
                return newMessages;
              });
            } catch (e) {
              // Skip any parsing errors for non-JSON lines
              console.debug('Skipping unparseable line:', data);
              continue;
            }
          }
        }
      }

    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to get AI response");
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-black/30 backdrop-blur-sm">
      <div className="p-4 border-b border-white/10">
        <h2 className="text-xl font-semibold">AI Assistant</h2>
        <p className="text-sm text-muted-foreground">
          {selectedFile 
            ? `Discussing: ${selectedFile}`
            : "I'll help you create and optimize your QUBOts"
          }
        </p>
      </div>

      <div className="p-4 border-b border-white/10">
        <Tabs value={activeRole} onValueChange={(value: any) => setActiveRole(value)}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="analyzer">Code Analyzer</TabsTrigger>
            <TabsTrigger value="modifier">Code Modifier</TabsTrigger>
            <TabsTrigger value="communicator">Communicator</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                message.role === "assistant" ? "items-start" : "items-start justify-end"
              }`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
              )}
              <div
                className={`rounded-lg p-3 max-w-[80%] ${
                  message.role === "assistant"
                    ? "bg-accent"
                    : "bg-blue-500/20"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              activeRole === 'analyzer' 
                ? "Ask me to analyze your code..."
                : activeRole === 'modifier'
                ? "Ask me to suggest code modifications..."
                : "Ask me anything about creating QUBOts..."
            }
            className="min-h-[60px] bg-white/5 border-white/10 resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading}
            className="h-[60px] w-[60px] bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};