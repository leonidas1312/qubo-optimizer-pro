import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Code2, Database, Cpu, Activity, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-100">
              Welcome to CEPTUM
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your Cloud Optimization Platform for Enterprise Solutions
            </p>
          </div>

          {/* Quick Start Guide */}
          <Card className="p-6 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-4">Quick Start Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-purple-400">
                  <Database className="h-5 w-5" />
                  <h3 className="font-semibold">1. Explore Datasets</h3>
                </div>
                <p className="text-muted-foreground">
                  Browse through our collection of optimization datasets or upload your own.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-purple-400">
                  <Cpu className="h-5 w-5" />
                  <h3 className="font-semibold">2. Select Hardware</h3>
                </div>
                <p className="text-muted-foreground">
                  Choose from various computing resources optimized for your needs.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-purple-400">
                  <Activity className="h-5 w-5" />
                  <h3 className="font-semibold">3. Monitor Jobs</h3>
                </div>
                <p className="text-muted-foreground">
                  Track and manage your optimization tasks in real-time.
                </p>
              </div>
            </div>
          </Card>

          {/* Platform Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Database className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Dataset Management</h3>
                  <p className="text-muted-foreground mb-4">
                    Efficiently manage and organize your optimization datasets with our intuitive interface.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/datasets')}
                    className="group"
                  >
                    Explore Datasets
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6 animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Cpu className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Hardware Resources</h3>
                  <p className="text-muted-foreground mb-4">
                    Access powerful computing resources tailored for optimization tasks.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/hardware')}
                    className="group"
                  >
                    View Hardware
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6 animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Activity className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Job Management</h3>
                  <p className="text-muted-foreground mb-4">
                    Monitor and control your optimization tasks with comprehensive analytics.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/jobs')}
                    className="group"
                  >
                    View Jobs
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6 animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <BookOpen className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Documentation</h3>
                  <p className="text-muted-foreground mb-4">
                    Access comprehensive guides and documentation to make the most of our platform.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/docs')}
                    className="group"
                  >
                    View Documentation
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Help Section */}
          <Card className="p-6 bg-purple-500/5 border-purple-500/20 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold">Need Help Getting Started?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive documentation and AI assistant are here to help you make the most of our platform.
              </p>
              <div className="flex justify-center gap-4">
                <Button 
                  onClick={() => navigate('/docs')}
                  className="group"
                >
                  Read Documentation
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/ai-assistant')}
                  className="group"
                >
                  Ask AI Assistant
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;