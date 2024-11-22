import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Cpu, Zap, Target, Code, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/uploadalgos");
  };

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto">
        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col items-center justify-center text-center animate-fade-in-slow">
          <h1 className="text-6xl font-bold mb-6 gradient-text leading-tight max-w-4xl">
            A Collaborative Platform for Optimization Algorithms
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover, experiment with, and contribute to a diverse range of optimization algorithms.
            Upload your own algorithms, solve complex QUBO problems, and collaborate with a community
            of optimization enthusiasts.
          </p>
          <Button onClick={handleGetStarted} size="lg" className="group">
            Try the Playground
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </section>

        {/* Features Section */}
        <section className="py-24 animate-fade-in">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-card hover:bg-card/80 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Cpu className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Diverse Algorithm Library</h3>
              <p className="text-muted-foreground leading-relaxed">
                Access a rich collection of optimization algorithms, from classical methods to quantum-inspired techniques, all in one place.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-card hover:bg-card/80 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Contribute Your Algorithms</h3>
              <p className="text-muted-foreground leading-relaxed">
                Upload and test your own optimization algorithms in a secure environment. Share your innovations with the community.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-card hover:bg-card/80 transition-colors">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Interactive Playground</h3>
              <p className="text-muted-foreground leading-relaxed">
                Experiment with different algorithms and parameters. Upload your QUBO matrices and visualize optimization results instantly.
              </p>
            </div>
          </div>
        </section>

        {/* New Open Source Section */}
        <section className="py-24 bg-background animate-fade-in">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Embracing Open Source</h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              We believe in the power of open-source collaboration to drive innovation in optimization algorithms. By sharing knowledge and resources, we can solve complex problems more effectively.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Open Source Feature */}
              <div className="p-8 rounded-2xl bg-card hover:bg-card/80 transition-colors flex flex-col items-center">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Open Source Contribution</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Contribute to our open-source repository. Share your algorithms, improve existing ones, and collaborate with developers worldwide.
                </p>
              </div>

              {/* Community Collaboration Feature */}
              <div className="p-8 rounded-2xl bg-card hover:bg-card/80 transition-colors flex flex-col items-center">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Join Our Community</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Engage with a network of optimization enthusiasts. Share insights, ask questions, and work together to advance the field.
                </p>
              </div>
            </div>
            <Button onClick={handleGetStarted} size="lg" className="mt-12 group">
              Get Involved
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Index;
