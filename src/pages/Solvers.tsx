import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SolverInfo } from "@/components/solver/SolverInfo";
import { useState } from "react";

const Solvers = () => {
  const [selectedSolver, setSelectedSolver] = useState("simulated-annealing");

  return (
    <DashboardLayout>
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8">Solvers Documentation</h1>
        <SolverInfo selectedSolver={selectedSolver} />
      </div>
    </DashboardLayout>
  );
};

export default Solvers;