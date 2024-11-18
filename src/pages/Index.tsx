import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MatrixUpload } from "@/components/upload/MatrixUpload";
import { SolverConfig } from "@/components/solver/SolverConfig";
import { ResultsChart } from "@/components/visualization/ResultsChart";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid gap-8 animate-fade-in">
          <MatrixUpload />
          
          <div className="grid md:grid-cols-2 gap-8">
            <SolverConfig />
            <ResultsChart />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;