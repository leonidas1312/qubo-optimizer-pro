import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ResultsChart } from "@/components/visualization/ResultsChart";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8">Welcome to QUBO Playground</h1>
        <ResultsChart data={[
          { iteration: 1, energy: -10 },
          { iteration: 2, energy: -15 },
          { iteration: 3, energy: -25 },
          { iteration: 4, energy: -28 },
          { iteration: 5, energy: -32 },
        ]} />
      </div>
    </DashboardLayout>
  );
};

export default Index;
