import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code2, Database, Cpu, Activity, BookOpen, ExternalLink } from "lucide-react";

const Documentation = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold gradient-text">Documentation</h1>
            <p className="text-muted-foreground mt-2">
              Learn how to use QUBOt effectively for your optimization needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Code2 className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Getting Started</h2>
                  <p className="text-muted-foreground mb-4">
                    Learn the basics of using QUBOt for optimization problems
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Platform overview</li>
                    <li>• Creating your first solver</li>
                    <li>• Understanding QUBO problems</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Database className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Data Management</h2>
                  <p className="text-muted-foreground mb-4">
                    Working with datasets and problem instances
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Supported file formats</li>
                    <li>• Data preprocessing</li>
                    <li>• Best practices</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Cpu className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Hardware Guide</h2>
                  <p className="text-muted-foreground mb-4">
                    Understanding computing resources
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• CPU vs GPU optimization</li>
                    <li>• Resource selection</li>
                    <li>• Performance tips</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-yellow-500/10">
                  <Activity className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Job Management</h2>
                  <p className="text-muted-foreground mb-4">
                    Running and monitoring optimization tasks
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Submitting jobs</li>
                    <li>• Monitoring progress</li>
                    <li>• Analyzing results</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Additional Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start">
                <BookOpen className="mr-2 h-4 w-4" />
                API Documentation
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="justify-start">
                <Code2 className="mr-2 h-4 w-4" />
                Example Projects
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Documentation;