import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BlockEditor } from "@/components/blocks/BlockEditor";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">QUBOt Block Editor</h1>
          <p className="text-muted-foreground">
            Connect solvers, datasets, and hardware to create optimization workflows
          </p>
        </div>
        <div className="mt-8 h-[calc(100vh-16rem)]">
          <BlockEditor />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;