import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  // If user is already authenticated, redirect to platform
  if (isAuthenticated) {
    navigate('/playground');
    return null;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-background" />
      
      {/* Animated circles in background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Main content */}
      <div className="relative container mx-auto px-4 h-screen flex flex-col items-center justify-center text-center">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* Logo and Brand */}
          <div className="mb-12">
            <h1 className="text-7xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-100">
              CEPTUM
            </h1>
            <p className="text-xl text-purple-200/80">
              Cloud Optimization Platform
            </p>
          </div>

          {/* Main Message */}
          <h2 className="text-4xl sm:text-5xl font-semibold leading-tight gradient-text">
            Scalable Optimization Solutions for the Modern Enterprise
          </h2>
          
          {/* Description */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Empower your business with our cloud-based platform, delivering efficient and accessible optimization solutions for enterprises and researchers alike.
          </p>

          {/* CTA Button */}
          <div className="pt-8">
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="text-lg px-8 py-6 bg-purple-600 hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Login to Try Platform
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Scalable</h3>
              <p className="text-muted-foreground">
                Grow your optimization capacity seamlessly with cloud infrastructure
              </p>
            </div>
            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Efficient</h3>
              <p className="text-muted-foreground">
                Leverage advanced algorithms and computing resources
              </p>
            </div>
            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Accessible</h3>
              <p className="text-muted-foreground">
                Easy-to-use interface for complex optimization problems
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;