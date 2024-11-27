import { DefaultSolvers } from "@/components/qubots/DefaultSolvers";
import { SolverChat } from "@/components/solver/chat/SolverChat";

interface SolverSelectorProps {
  selectedSolver: any;
  onSelect: (solver: any) => void;
}

export const SolverSelector = ({ selectedSolver, onSelect }: SolverSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Available Solvers</h3>
          <DefaultSolvers
            onSelect={onSelect}
            selectedSolverId={selectedSolver?.id}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Create Custom Solver</h3>
          <SolverChat />
        </div>
      </div>
    </div>
  );
};