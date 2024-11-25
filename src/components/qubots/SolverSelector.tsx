import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Cpu, Star, Target, Dna } from "lucide-react";
import { useState } from "react";

const solvers = [
  {
    id: "simulated-annealing",
    name: "Simulated Annealing",
    icon: <Star className="h-4 w-4 mr-2" />,
    description: "A probabilistic technique for approximating the global optimum."
  },
  {
    id: "quantum-inspired",
    name: "Quantum-Inspired",
    icon: <Cpu className="h-4 w-4 mr-2" />,
    description: "A hybrid quantum-classical algorithm."
  },
  {
    id: "tabu-search",
    name: "Tabu Search",
    icon: <Target className="h-4 w-4 mr-2" />,
    description: "A metaheuristic search method using memory structures."
  },
  {
    id: "genetic-algorithm",
    name: "Genetic Algorithm",
    icon: <Dna className="h-4 w-4 mr-2" />,
    description: "An evolutionary algorithm that mimics natural selection."
  }
];

interface SolverSelectorProps {
  onSelect: (solverId: string) => void;
}

export const SolverSelector = ({ onSelect }: SolverSelectorProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Command className="rounded-lg border shadow-md w-full">
      <CommandInput placeholder="Search solvers..." />
      <CommandGroup heading="Available Solvers">
        {solvers.map((solver) => (
          <CommandItem
            key={solver.id}
            onSelect={() => {
              onSelect(solver.id);
              setOpen(false);
            }}
            className="flex items-center"
          >
            {solver.icon}
            <div className="flex flex-col">
              <span className="font-medium">{solver.name}</span>
              <span className="text-xs text-muted-foreground">{solver.description}</span>
            </div>
          </CommandItem>
        ))}
      </CommandGroup>
      <CommandEmpty>No solvers found.</CommandEmpty>
    </Command>
  );
};