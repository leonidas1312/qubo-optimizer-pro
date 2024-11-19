import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Cpu, Zap, Target } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/playground");
  };

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto">
        <section className="min-h-[80vh] flex flex-col items-center justify-center text-center animate-fade-in-slow">
          <h1 className="text-6xl font-bold mb-6 gradient-text leading-tight max-w-4xl">
            Quantum-Inspired Optimization for Complex Problems
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Transform your complex optimization challenges into solutions using our advanced QUBO solver platform. Harness the power of quantum-inspired algorithms for real-world applications.
          </p>
          <Button onClick={handleGetStarted} size="lg" className="group">
            Start Optimizing
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </section>

        <section className="py-24 animate-fade-in">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-card hover:bg-card/80 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Cpu className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Quantum-Inspired Algorithms</h3>
              <p className="text-muted-foreground leading-relaxed">
                Leverage advanced optimization techniques inspired by quantum computing principles to solve complex problems efficiently.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card hover:bg-card/80 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Lightning-Fast Solutions</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get rapid results with our optimized solvers, designed to handle large-scale optimization problems with ease.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card hover:bg-card/80 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Precise Results</h3>
              <p className="text-muted-foreground leading-relaxed">
                Achieve optimal solutions with our high-precision QUBO solvers, perfect for complex optimization challenges.
              </p>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Index;