import { Card } from "@/components/ui/card";
import { Server, Cpu } from "lucide-react";

export const HardwareTab = () => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">AWS Hardware Options</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Server className="h-6 w-6 text-blue-500" />
              <div>
                <h3 className="font-semibold">CPU Instances</h3>
                <p className="text-sm text-muted-foreground">
                  General purpose computing for most optimization tasks
                </p>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>t3.medium</span>
                    <span className="text-green-500">$0.0416/hour</span>
                  </li>
                  <li className="flex justify-between">
                    <span>c6i.large</span>
                    <span className="text-green-500">$0.085/hour</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Cpu className="h-6 w-6 text-purple-500" />
              <div>
                <h3 className="font-semibold">GPU Instances</h3>
                <p className="text-sm text-muted-foreground">
                  Accelerated computing for large-scale problems
                </p>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>g4dn.xlarge</span>
                    <span className="text-green-500">$0.526/hour</span>
                  </li>
                  <li className="flex justify-between">
                    <span>p3.2xlarge</span>
                    <span className="text-green-500">$3.06/hour</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Choosing the Right Instance</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
            <li>Use CPU instances for problems with up to 1000 variables</li>
            <li>Choose GPU instances for larger problems or when using quantum-inspired algorithms</li>
            <li>Consider memory requirements based on your problem size</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
