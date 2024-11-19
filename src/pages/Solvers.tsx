import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AlgorithmCard } from "@/components/solver/AlgorithmCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, Info, ChartBar, Check } from "lucide-react";

const simulatedAnnealingInfo = [
  {
    title: "Overview 🎯",
    description: "A probabilistic technique inspired by the metallurgical annealing process. Just as metals are heated and cooled to increase their strength, this algorithm explores solution spaces by allowing temporary 'uphill' moves to escape local optima. Perfect for complex optimization problems where finding the absolute best solution isn't critical.",
  },
  {
    title: "Key Features ⚡",
    description: "• Robust against local optima\n• Adaptable cooling schedules\n• Probabilistic acceptance criteria\n• Excellent for NP-hard problems\n• Parallel implementation support\n• Memory-efficient operation",
  },
  {
    title: "Mathematical Foundation 📐",
    description: "Based on the Metropolis-Hastings algorithm and Boltzmann distribution:\nP(ΔE) = exp(-ΔE/kT)\nwhere:\n• ΔE is the energy difference\n• k is Boltzmann's constant\n• T is the temperature parameter\n\nConvergence is guaranteed under certain conditions following the Geman-Geman theorem.",
  },
  {
    title: "Real-world Applications 🌍",
    description: "• Semiconductor chip placement and routing\n• Neural network training\n• Financial portfolio optimization\n• Vehicle routing problems\n• Production scheduling\n• Network design optimization\n• Molecular structure prediction",
  }
];

const quantumInspiredInfo = [
  {
    title: "Overview 🌌",
    description: "A groundbreaking approach that harnesses quantum computing principles without requiring quantum hardware. These algorithms simulate quantum phenomena like superposition and entanglement on classical computers, offering a bridge between classical and quantum optimization.",
  },
  {
    title: "Key Features 🚀",
    description: "• Quantum superposition simulation\n• Quantum entanglement modeling\n• Amplitude amplification\n• Quantum-inspired crossover\n• Quantum-inspired mutation\n• Hybrid classical-quantum approaches\n• Scalable to large problems",
  },
  {
    title: "Mathematical Foundation 📊",
    description: "Based on quantum mechanics principles:\nmin x^T Q x, where x ∈ {0,1}^n\n\nUtilizes concepts like:\n• Quantum bits (qubits)\n• Quantum gates\n• Quantum measurement\n• Quantum interference\n\nImplements quantum-inspired operators while maintaining classical computability.",
  },
  {
    title: "Industry Applications 🏭",
    description: "• Financial risk analysis\n• Supply chain optimization\n• Traffic flow management\n• Power grid optimization\n• Machine learning acceleration\n• Cryptography\n• Drug discovery optimization\n• Quantum chemistry simulations",
  }
];

const tabuSearchInfo = [
  {
    title: "Overview 🎯",
    description: "An advanced metaheuristic search method that enhances local search by maintaining a memory structure (tabu list) of previously visited solutions. This prevents cycling and allows the algorithm to escape local optima by forbidding certain moves.",
  },
  {
    title: "Key Features 🔍",
    description: "• Adaptive memory programming\n• Short-term memory (recency)\n• Long-term memory (frequency)\n• Aspiration criteria\n• Strategic oscillation\n• Path relinking\n• Reactive mechanisms",
  },
  {
    title: "Mathematical Foundation 📐",
    description: "Utilizes sophisticated memory structures:\nS* = arg min{f(s) | s ∈ N(x) - T}\nwhere:\n• S* is the best non-tabu solution\n• N(x) is the neighborhood of x\n• T is the tabu list\n\nIncorporates frequency-based memory and pattern recognition.",
  },
  {
    title: "Enterprise Applications 🏢",
    description: "• Workforce scheduling\n• Vehicle routing optimization\n• Network design\n• Production planning\n• Resource allocation\n• Facility location\n• Telecommunications network optimization\n• Supply chain design",
  }
];

const geneticAlgorithmInfo = [
  {
    title: "Overview 🧬",
    description: "A powerful evolutionary algorithm that mimics natural selection processes. Through iterative evolution of a population of solutions, it combines survival of the fittest with structured yet randomized information exchange to form a robust search mechanism.",
  },
  {
    title: "Key Features 🌟",
    description: "• Population-based evolution\n• Natural selection simulation\n• Crossover operations\n• Mutation mechanisms\n• Elitism strategies\n• Multi-objective optimization\n• Parallel processing capability\n• Adaptive parameter control",
  },
  {
    title: "Mathematical Foundation 📊",
    description: "Based on evolutionary biology principles:\nP(t+1) = Selection(Crossover(Mutation(P(t))))\n\nKey components:\n• Fitness function evaluation\n• Selection probability\n• Crossover probability\n• Mutation rate\n\nConvergence follows Holland's schema theorem.",
  },
  {
    title: "Industry Impact 🏭",
    description: "• Deep learning architecture optimization\n• Financial market prediction\n• Aerospace design optimization\n• Robot path planning\n• Game AI development\n• Circuit design optimization\n• Chemical process optimization\n• Structural engineering",
  }
];

const Solvers = () => {
  return (
    <DashboardLayout>
      <div className="container py-8 max-w-[95%] mx-auto space-y-16">
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-bold mb-8 gradient-text flex items-center gap-2">
              <Star className="h-8 w-8" />
              Simulated Annealing
            </h2>
            <Carousel className="w-[95%] mx-auto" opts={{ 
              align: "start",
              containScroll: "trimSnaps",
              slidesToScroll: 2
            }}>
              <CarouselContent className="-ml-2 md:-ml-4">
                {simulatedAnnealingInfo.map((info, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2">
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
            <h2 className="text-3xl font-bold mb-8 gradient-text flex items-center gap-2">
              <Info className="h-8 w-8" />
              Quantum-Inspired Optimization
            </h2>
            <Carousel className="w-[95%] mx-auto" opts={{ 
              align: "start",
              containScroll: "trimSnaps",
              slidesToScroll: 2
            }}>
              <CarouselContent className="-ml-2 md:-ml-4">
                {quantumInspiredInfo.map((info, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2">
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
            <h2 className="text-3xl font-bold mb-8 gradient-text flex items-center gap-2">
              <ChartBar className="h-8 w-8" />
              Tabu Search
            </h2>
            <Carousel className="w-[95%] mx-auto" opts={{ 
              align: "start",
              containScroll: "trimSnaps",
              slidesToScroll: 2
            }}>
              <CarouselContent className="-ml-2 md:-ml-4">
                {tabuSearchInfo.map((info, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2">
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
            <h2 className="text-3xl font-bold mb-8 gradient-text flex items-center gap-2">
              <Check className="h-8 w-8" />
              Genetic Algorithms
            </h2>
            <Carousel className="w-[95%] mx-auto" opts={{ 
              align: "start",
              containScroll: "trimSnaps",
              slidesToScroll: 2
            }}>
              <CarouselContent className="-ml-2 md:-ml-4">
                {geneticAlgorithmInfo.map((info, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2">
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