import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Code, Database, Play, Table } from "lucide-react";
import { AVAILABLE_COMMANDS } from "../types/commands";

interface ExamplePromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

export const ExamplePrompts = ({ onSelectPrompt }: ExamplePromptsProps) => {
  return (
    <div className="grid gap-4">
      {AVAILABLE_COMMANDS.map((command, index) => (
        <motion.div
          key={command.type}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-auto p-4"
            onClick={() => onSelectPrompt(command.type)}
          >
            {command.type === 'ADD_SOLVER' && <Code className="h-5 w-5" />}
            {command.type === 'ADD_DATASET' && <Database className="h-5 w-5" />}
            {command.type === 'USE_SOLVER' && <Play className="h-5 w-5" />}
            {command.type === 'USE_DATASET' && <Table className="h-5 w-5" />}
            <div className="text-left">
              <p className="font-medium">{command.label}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {command.description}
              </p>
            </div>
          </Button>
        </motion.div>
      ))}
    </div>
  );
};