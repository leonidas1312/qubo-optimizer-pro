import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, Plus, Settings } from "lucide-react";

export const AIAssistantSidebar = () => {
  const suggestions = [
    "Help me create a new QUBOt",
    "What hardware should I use for my optimization problem?",
    "How do I connect my dataset to a solver?",
    "Explain how simulated annealing works",
    "What's the best solver for my TSP problem?",
  ];

  return (
    <div className="w-80 border-r border-white/10 bg-black/30 backdrop-blur-sm flex flex-col">
      <div className="p-4 border-b border-white/10">
        <Button className="w-full justify-start gap-2" variant="outline">
          <Plus className="h-4 w-4" />
          New Conversation
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Suggested Prompts</h3>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-sm h-auto py-2 px-3"
                >
                  <Brain className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate text-left">{suggestion}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-white/10">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  );
};