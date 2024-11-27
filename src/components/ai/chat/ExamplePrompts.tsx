import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Add framer-motion for smooth animations
<lov-add-dependency>framer-motion@latest</lov-add-dependency>

interface ExamplePromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

export const ExamplePrompts = ({ onSelectPrompt }: ExamplePromptsProps) => {
  const [visiblePromptIndex, setVisiblePromptIndex] = useState<number | null>(null);
  const [prompts, setPrompts] = useState<string[]>([]);

  // Dynamic prompts based on context
  const contextualPrompts = [
    {
      trigger: "empty",
      prompts: [
        "Help me create a solver for the Traveling Salesman Problem",
        "How can I optimize my QUBO matrix?",
        "Show me how to implement simulated annealing",
      ]
    },
    {
      trigger: "code",
      prompts: [
        "Can you explain this code section?",
        "How can I optimize this algorithm?",
        "What are the potential issues in this implementation?",
      ]
    },
    {
      trigger: "error",
      prompts: [
        "Why am I getting this error?",
        "How can I fix this issue?",
        "What's causing this problem?",
      ]
    }
  ];

  useEffect(() => {
    // Start with empty state prompts
    setPrompts(contextualPrompts[0].prompts);
    
    // Show prompts one by one with a delay
    const interval = setInterval(() => {
      setVisiblePromptIndex((prev) => {
        if (prev === null) return 0;
        if (prev >= prompts.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [prompts.length]);

  return (
    <div className="p-4 space-y-3">
      <p className="text-sm text-muted-foreground">Try asking:</p>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {prompts.map((prompt, index) => (
            visiblePromptIndex !== null && index <= visiblePromptIndex && (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="outline"
                  className="text-sm"
                  onClick={() => onSelectPrompt(prompt)}
                >
                  {prompt}
                </Button>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};