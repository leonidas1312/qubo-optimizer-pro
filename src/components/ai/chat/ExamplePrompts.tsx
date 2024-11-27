import { Button } from "@/components/ui/button";

const examplePrompts = [
  "Help me create a solver for the Traveling Salesman Problem",
  "How can I optimize my QUBO matrix?",
  "Show me how to implement simulated annealing",
];

interface ExamplePromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

export const ExamplePrompts = ({ onSelectPrompt }: ExamplePromptsProps) => {
  return (
    <div className="p-4 space-y-3">
      <p className="text-sm text-muted-foreground">Try asking:</p>
      <div className="flex flex-wrap gap-2">
        {examplePrompts.map((prompt, index) => (
          <Button
            key={index}
            variant="outline"
            className="text-sm"
            onClick={() => onSelectPrompt(prompt)}
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
};