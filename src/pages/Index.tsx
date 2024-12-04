import { DashboardLayout } from "@/components/layout/DashboardLayout";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">Welcome to CEPTUM</h1>
        <p className="text-lg text-muted-foreground">
          Your cloud-based optimization platform for solving complex QUBO problems.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Index;