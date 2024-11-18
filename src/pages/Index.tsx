import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MatrixUpload } from "@/components/upload/MatrixUpload";
import { SolverConfig } from "@/components/solver/SolverConfig";
import { ResultsChart } from "@/components/visualization/ResultsChart";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto">
        <section className="text-center mb-16 animate-fade-in-slow">
          <h1 className="text-5xl font-bold mb-4 gradient-text">
            Quantum-Inspired Optimization
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Upload your QUBO matrices and solve complex optimization problems using quantum-inspired algorithms.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline">View Examples</Button>
          </div>
        </section>

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