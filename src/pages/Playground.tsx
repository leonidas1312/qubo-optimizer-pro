import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MatrixUpload } from "@/components/upload/MatrixUpload";
import { SolverConfig } from "@/components/solver/SolverConfig";
import { useState } from "react";

const Playground = () => {
  const [quboMatrix, setQuboMatrix] = useState<number[][] | null>(null);
  const [constant, setConstant] = useState<number>(0);

  const handleMatrixLoaded = (matrix: number[][], constant: number) => {
    setQuboMatrix(matrix);
    setConstant(constant);
  };

  return (
    <DashboardLayout>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 gradient-text">Optimization Playground</h1>
        
        <section className="space-y-8">
          <MatrixUpload onMatrixLoaded={handleMatrixLoaded} />
          <SolverConfig quboMatrix={quboMatrix} constant={constant} />
        </section>
      </main>
    </DashboardLayout>
  );
};

export default Playground;