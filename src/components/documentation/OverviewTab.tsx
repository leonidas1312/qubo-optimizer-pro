import { Card } from "@/components/ui/card";

export const OverviewTab = () => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Welcome to CEPTUM</h2>
      <p className="text-muted-foreground mb-4">
        CEPTUM is a cloud-based platform for solving Quadratic Unconstrained Binary Optimization (QUBO) problems. 
        Whether you're a researcher, data scientist, or industry professional, our platform provides the tools 
        you need to tackle complex optimization challenges.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="font-semibold">Key Features</h3>
          <ul className="list-disc list-inside text-muted-foreground">
            <li>Multiple optimization algorithms</li>
            <li>Cloud-based computation</li>
            <li>Easy dataset management</li>
            <li>Real-time visualization</li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">Getting Started</h3>
          <ul className="list-disc list-inside text-muted-foreground">
            <li>Create an account</li>
            <li>Upload or select a dataset</li>
            <li>Choose a solver</li>
            <li>Configure and run</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};