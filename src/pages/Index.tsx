import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import {
  Cloud,
  Database,
  Server,
  Cpu,
  Users,
  Lock,
  Workflow,
  ArrowRight,
  GitBranch,
  Network,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Index = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const handleTryPlatform = () => {
    if (isAuthenticated) {
      navigate('/playground');
    } else {
      toast.error("Please log in to access the platform");
      login();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-purple-900/20 z-0" />
        <div className="container mx-auto px-4 z-10">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-6xl font-bold gradient-text">
              Cloud Optimization Platform
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect optimization algorithms with datasets and cloud hardware resources. 
              Scale your optimization problems effortlessly with our cloud-native platform.
            </p>
            <div className="flex justify-center gap-4 pt-8">
              <Button 
                size="lg" 
                className="animate-fade-in" 
                style={{ animationDelay: "0.2s" }}
                onClick={handleTryPlatform}
              >
                Try Platform
              </Button>
              <Button asChild variant="outline" size="lg" className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <Link to="/docs">Documentation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Cloud Features Grid */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            Cloud-Native Optimization
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Cloud className="w-10 h-10" />}
              title="Cloud Infrastructure"
              description="Leverage AWS EC2 for scalable computing and S3 for secure data storage."
            />
            <FeatureCard
              icon={<Lock className="w-10 h-10" />}
              title="Private & Open Source"
              description="Choose between private algorithms or contribute to the open-source community."
            />
            <FeatureCard
              icon={<Network className="w-10 h-10" />}
              title="Seamless Integration"
              description="Connect algorithms, datasets, and hardware resources effortlessly."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            How It Works
          </h2>
          <div className="space-y-24">
            <WorkflowStep
              icon={<GitBranch />}
              title="Import Your Algorithm"
              description="Upload your optimization algorithm or use our open-source collection."
              align="right"
            />
            <WorkflowStep
              icon={<Database />}
              title="Connect Your Data"
              description="Link your datasets securely through Amazon S3 integration."
              align="left"
            />
            <WorkflowStep
              icon={<Server />}
              title="Select Computing Resources"
              description="Choose the right EC2 instance for your workload."
              align="right"
            />
            <WorkflowStep
              icon={<Workflow />}
              title="Execute Workflow"
              description="Run your optimization tasks with automatic scaling."
              align="left"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold gradient-text">
              Ready to Optimize?
            </h2>
            <p className="text-xl text-muted-foreground">
              Start solving optimization problems in the cloud today.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link to="/playground">
                Get Started <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <Card className="hover-card glass animate-fade-in">
    <CardHeader>
      <div className="mb-4 text-primary">{icon}</div>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  </Card>
);

const WorkflowStep = ({ icon, title, description, align }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  align: "left" | "right";
}) => (
  <div className={`flex items-center gap-8 ${align === "right" ? "flex-row-reverse" : ""}`}>
    <div className="flex-1">
      <Card className="hover-card glass animate-fade-in">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="text-primary">{icon}</div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    <div className="flex-1" />
  </div>
);

export default Index;