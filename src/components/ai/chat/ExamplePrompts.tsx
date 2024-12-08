import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MessageSquarePlus, Code, Wand2 } from "lucide-react";

interface ExamplePromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

export const ExamplePrompts = ({ onSelectPrompt }: ExamplePromptsProps) => {
  const examples = [
    {
      icon: <Code className="w-4 h-4" />,
      title: "Code Analysis",
      prompts: [
        "Explain this code to me",
        "What could be improved in this implementation?",
        "How can I make this code more efficient?",
      ]
    },
    {
      icon: <Wand2 className="w-4 h-4" />,
      title: "Code Generation",
      prompts: [
        "ADD SOLVER my_solver.py",
        "Help me implement error handling",
        "Generate unit tests for this code",
      ]
    },
    {
      icon: <MessageSquarePlus className="w-4 h-4" />,
      title: "General Help",
      prompts: [
        "What's the best practice for this pattern?",
        "How can I optimize this algorithm?",
        "Suggest some improvements for this code",
      ]
    }
  ];

  return (
    <div className="grid gap-6 px-2">
      {examples.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: sectionIndex * 0.1 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            {section.icon}
            <h4 className="text-sm font-medium">{section.title}</h4>
          </div>
          <div className="grid gap-2">
            {section.prompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start text-left h-auto py-2 px-3 hover:bg-purple-500/5 hover:text-purple-500"
                onClick={() => onSelectPrompt(prompt)}
              >
                <span className="text-sm">{prompt}</span>
              </Button>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};