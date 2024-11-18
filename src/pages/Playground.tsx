import { DashboardLayout } from "@/components/layout/DashboardLayout";

const Playground = () => {
  return (
    <DashboardLayout>
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8 gradient-text animate-fade-in">Playground</h1>
        <p className="text-muted-foreground">Welcome to the QUBOt Playground. More features coming soon!</p>
      </div>
    </DashboardLayout>
  );
};

export default Playground;