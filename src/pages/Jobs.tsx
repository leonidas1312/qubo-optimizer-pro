import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Clock, Download } from "lucide-react";

const Jobs = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold gradient-text">Job Management</h1>
            <p className="text-muted-foreground mt-2">
              Monitor and manage your optimization tasks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold">Active Jobs</h3>
              </div>
              <p className="text-3xl font-bold mt-2">0</p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold">Completed</h3>
              </div>
              <p className="text-3xl font-bold mt-2">0</p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5 text-purple-500" />
                <h3 className="font-semibold">Results Available</h3>
              </div>
              <p className="text-3xl font-bold mt-2">0</p>
            </Card>
          </div>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Jobs</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground text-center py-8">
                No jobs have been submitted yet. Start by creating a new optimization task!
              </p>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Jobs;