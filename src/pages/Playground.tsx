import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MatrixUpload } from "@/components/upload/MatrixUpload";
import { SolverConfig } from "@/components/solver/SolverConfig";
import { ResultsChart } from "@/components/visualization/ResultsChart";
import { useState } from "react";

const Playground = () => {
  const [quboMatrix, setQuboMatrix] = useState<number[][] | null>(null);

  return (
    <DashboardLayout>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 gradient-text">Optimization Playground</h1>
        
        <section className="space-y-8">
          <MatrixUpload onMatrixLoaded={setQuboMatrix} />
          <SolverConfig quboMatrix={quboMatrix} />
          <ResultsChart />
        </section>
      </main>
    </DashboardLayout>
  );
};

export default Playground;