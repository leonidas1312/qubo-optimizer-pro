import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Cpu, Zap, Target, Code, Users, Database } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Quantum-Inspired Optimization",
      description: "Leverage cutting-edge algorithms powered by quantum computing principles for complex optimization problems."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Precision & Performance",
      description: "Achieve optimal solutions with our advanced solvers, designed for accuracy and efficiency."
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Seamless Integration",
      description: "Connect with various datasets and hardware configurations for comprehensive optimization solutions."
    }
  ];

  const sections = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Create Your QUBOt",
      description: "Build and customize your optimization solver with our intuitive interface.",
      action: () => navigate("/solvers")
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Test & Deploy",
      description: "Validate your solver with real datasets and deploy on optimal hardware.",
      action: () => navigate("/playground")
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community & Support",
      description: "Join our community of optimization experts and share knowledge.",
      action: () => navigate("/leaderboard")
    }
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-32 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/20 z-0" />
          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 leading-tight animate-fade-in">
              Untangling Optimization
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in">
              Transform complex optimization challenges into elegant solutions with QUBOt's quantum-inspired algorithms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate("/solvers")} 
                size="lg" 
                className="group bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 text-white animate-fade-in"
              >
                Create Your QUBOt
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                onClick={() => navigate("/playground")} 
                size="lg" 
                variant="outline"
                className="group animate-fade-in"
              >
                Try Playground
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-6 bg-black/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Why Choose QUBOt?</h2>
            <div className="grid md:grid-cols-3 gap-8">
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
          </div>
        </section>

        {/* Call to Action Grid */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Get Started</h2>
            <div className="grid md:grid-cols-3 gap-8">
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
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Index;