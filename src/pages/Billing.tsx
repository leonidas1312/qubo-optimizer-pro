import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Cpu, Zap, Clock } from "lucide-react";

const Billing = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold gradient-text">Billing & Usage</h1>
            <p className="text-muted-foreground mt-2">
              Manage your account billing and monitor resource usage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Current Balance</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Available Credits</span>
                  <span className="text-2xl font-bold">$0.00</span>
                </div>
                <Button className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Add Credits
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Usage Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-blue-500" />
                    <span>CPU Usage</span>
                  </div>
                  <span>0 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-purple-500" />
                    <span>GPU Usage</span>
                  </div>
                  <span>0 hours</span>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-medium">CPU Resources</h3>
                <p className="text-muted-foreground">$0.80 per hour</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>2-4 CPU cores</li>
                  <li>8-16GB RAM</li>
                  <li>Ideal for small to medium datasets</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">GPU Resources</h3>
                <p className="text-muted-foreground">$2.40 per hour</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>NVIDIA T4/P100</li>
                  <li>16GB GPU Memory</li>
                  <li>Perfect for large-scale optimization</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Billing;