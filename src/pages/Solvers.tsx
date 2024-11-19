import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AlgorithmCard } from "@/components/solver/AlgorithmCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const simulatedAnnealingInfo = [
  {
    title: "Overview",
    description: "A probabilistic technique for approximating the global optimum of a given function. Inspired by the annealing process in metallurgy where metals cool and crystallize.",
  },
  {
    title: "Key Features",
    description: "• Handles non-convex problems\n• Escapes local optima\n• Parallel implementation possible\n• Suitable for large-scale problems",
  },
  {
    title: "Mathematical Foundation",
    description: "Based on the Metropolis-Hastings algorithm. Uses temperature parameter T to control exploration vs exploitation: P(ΔE) = exp(-ΔE/kT)",
  },
  {
    title: "Applications",
    description: "• VLSI Circuit Design\n• Network Optimization\n• Job Shop Scheduling\n• Portfolio Optimization",
  }
];

const quantumInspiredInfo = [
  {
    title: "Overview",
    description: "Classical algorithms that mimic quantum phenomena to solve optimization problems without requiring quantum hardware.",
  },
  {
    title: "Key Features",
    description: "• Quantum-inspired superposition\n• Quantum-inspired entanglement\n• Classical implementation\n• Scalable to large problems",
  },
  {
    title: "Mathematical Foundation",
    description: "Uses binary optimization techniques inspired by quantum mechanics: min x^T Q x, where x ∈ {0,1}^n",
  },
  {
    title: "Applications",
    description: "• Financial Portfolio Optimization\n• Traffic Flow Optimization\n• Supply Chain Management\n• Resource Allocation",
  }
];

const Solvers = () => {
  return (
    <DashboardLayout>
      <div className="container py-8 max-w-7xl mx-auto space-y-16">
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-bold mb-8 gradient-text">Simulated Annealing</h2>
            <Carousel className="w-full" opts={{ 
              align: "start",
              containScroll: false,
              dragFree: false
            }}>
              <CarouselContent>
                {simulatedAnnealingInfo.map((info, index) => (
                  <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
                    <AlgorithmCard
                      title={info.title}
                      description={info.description}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8 gradient-text">Quantum-Inspired Optimization</h2>
            <Carousel className="w-full" opts={{ 
              align: "start",
              containScroll: false,
              dragFree: false
            }}>
              <CarouselContent>
                {quantumInspiredInfo.map((info, index) => (
                  <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
                    <AlgorithmCard
                      title={info.title}
                      description={info.description}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Solvers;