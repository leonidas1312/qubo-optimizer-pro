import { DefaultSolvers } from "../DefaultSolvers";
import { Label } from "@/components/ui/label";

interface SolverSectionProps {
  selectedSolver: {
    id: string;
    name: string;
    parameters: Record<string, any>;
  } | null;
  onSelect: (solver: {
    id: string;
    name: string;
    parameters: Record<string, any>;
  }) => void;
}

export const SolverSection = ({ selectedSolver, onSelect }: SolverSectionProps) => {
  return (
    <div className="space-y-4">
      <Label>Select a Solver</Label>
      <DefaultSolvers 
        onSelect={onSelect} 
        selectedSolverId={selectedSolver?.id}
      />
    </div>
  );
};