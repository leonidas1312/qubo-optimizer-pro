import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Blocks,
  Database,
  Network,
  Cpu,
  Users,
  Workflow,
  Link as LinkIcon,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background to-muted z-0" />
        <div className="container mx-auto px-4 z-10">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-6xl font-bold gradient-text">
              Welcome to QUBOt
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Solve complex optimization problems with our innovative platform connecting quantum-inspired algorithms, datasets, and computing resources.
            </p>
            <div className="flex justify-center gap-4 pt-8">
              <Button asChild size="lg" className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <Link to="/playground">Try Playground</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <Link to="/docs">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Users className="w-10 h-10" />}
              title="Community-Driven"
              description="Join a growing community of researchers, developers, and optimization enthusiasts."
            />
            <FeatureCard
              icon={<Blocks className="w-10 h-10" />}
              title="QUBOt Blocks"
              description="Create and connect modular optimization components for complex problem-solving."
            />
            <FeatureCard
              icon={<Network className="w-10 h-10" />}
              title="Flexible Connections"
              description="Connect solvers, datasets, and hardware resources seamlessly."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            How QUBOt Works
          </h2>
          <div className="space-y-24">
            <WorkflowStep
              icon={<Blocks />}
              title="Create QUBOts"
              description="Design optimization blocks with our intuitive interface."
              align="right"
            />
            <WorkflowStep
              icon={<Database />}
              title="Connect Data"
              description="Link your datasets to QUBOt blocks for processing."
              align="left"
            />
            <WorkflowStep
              icon={<Cpu />}
              title="Execute"
              description="Run your workflows on optimized hardware."
              align="right"
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
              Start building your optimization workflows today.
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