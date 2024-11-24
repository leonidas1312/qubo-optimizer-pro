import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Cpu, Zap, Target, Code, Users, Database, Trophy, FileText } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/playground");
  };

  const features = [
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Quantum-Inspired Algorithms",
      description: "Leverage cutting-edge optimization techniques powered by quantum computing principles."
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Extensive Problem Library",
      description: "Access a growing collection of QUBO problems and their optimal solutions."
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Community Challenges",
      description: "Compete with others and showcase your optimization expertise."
    }
  ];

  const sections = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Interactive Playground",
      description: "Experiment with QUBO problems in real-time and visualize solutions instantly.",
      action: () => navigate("/playground")
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Create QUBOt Solver",
      description: "Build and share your own optimization algorithms with the community.",
      action: () => navigate("/uploadalgos")
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Join the Community",
      description: "Connect with other optimization enthusiasts and share knowledge.",
      action: () => navigate("/leaderboard")
    }
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/20 z-0" />
          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 leading-tight animate-fade-in">
              Next-Generation QUBO Optimization Platform
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in">
              Discover, experiment with, and contribute to a diverse range of quantum-inspired optimization algorithms.
            </p>
            <Button 
              onClick={handleGetStarted} 
              size="lg" 
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 text-white animate-fade-in"
            >
              Try the Playground
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-colors duration-300 animate-fade-in"
              >
                <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Sections Grid */}
        <section className="py-20 px-6 bg-accent/5">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={section.action}
                className="p-6 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-colors duration-300 text-left animate-fade-in group"
              >
                <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {section.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 flex items-center justify-between">
                  {section.title}
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {section.description}
                </p>
              </button>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Index;