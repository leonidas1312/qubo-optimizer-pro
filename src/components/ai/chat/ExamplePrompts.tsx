import { Button } from "@/components/ui/button";

interface ExamplePromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

export const ExamplePrompts = ({ onSelectPrompt }: ExamplePromptsProps) => {
  const examples = [
    "Can you help me optimize this code for better performance?",
    "How can I integrate this solver with the platform?",
    "What are the best practices for implementing QUBO problems?",
  ];

  return (
    <div className="space-y-4 mb-8">
      <h3 className="text-sm font-medium text-muted-foreground">Example prompts to get started:</h3>
      <div className="grid gap-2">
        {examples.map((example, index) => (
          <Button
            key={index}
            variant="outline"
            className="justify-start h-auto p-4 text-left"
            onClick={() => onSelectPrompt(example)}
          >
            {example}
          </Button>
        ))}
      </div>
    </div>
  );
};