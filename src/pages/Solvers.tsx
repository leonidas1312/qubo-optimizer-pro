import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AlgorithmCard } from "@/components/solver/AlgorithmCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, Cpu, Target, Dna } from "lucide-react";

const simulatedAnnealingInfo = [
  {
    title: "Overview",
    description: "A probabilistic optimization technique that mimics the physical process of annealing in metallurgy. Starting with a high temperature, the algorithm gradually 'cools' while exploring the solution space, allowing it to escape local optima and find better solutions.",
  },
  {
    title: "Implementation Details",
    description: "• Random initial solution generation\n• Temperature-based acceptance probability\n• Controlled cooling schedule\n• Neighbor generation through bit flipping\n• Best solution tracking\n• Cost computation using QUBO matrix",
  },
  {
    title: "Parameters",
    description: "• Initial Temperature: Controls initial exploration (default: 1000)\n• Cooling Rate: How quickly temperature decreases (default: 0.99)\n• Maximum Iterations: Number of search steps (default: 1000)\n\nHigher temperatures allow more exploration, while lower temperatures focus on exploitation.",
  },
  {
    title: "Applications",
    description: "• Portfolio optimization\n• Resource allocation\n• Network design\n• Circuit layout optimization\n• Production scheduling\n• Logistics optimization\n• Pattern recognition",
  }
];

const quantumInspiredInfo = [
  {
    title: "Overview",
    description: "A hybrid quantum-classical algorithm that combines quantum circuit simulation with reinforcement learning. It uses minimal encoding to represent classical variables with quantum bits, allowing for efficient problem solving with logarithmic qubit requirements.",
  },
  {
    title: "Implementation Details",
    description: "• Quantum circuit simulation using PennyLane\n• Hardware efficient ansatz implementation\n• Minimal encoding scheme\n• ADAM optimization for quantum parameters\n• Reinforcement learning local search\n• UCB-based exploitation phase\n• Softmax-based exploration phase",
  },
  {
    title: "Parameters",
    description: "• Number of Layers: Quantum circuit depth\n• Maximum Iterations: Optimizer+RL cycles\n• Number of Bitstrings: Samples from quantum circuit\n• Optimizer Time: ADAM optimization duration\n• RL Search Time: Local search duration\n• Initial Temperature: Controls RL exploration",
  },
  {
    title: "Key Features",
    description: "• Logarithmic qubit scaling\n• Hybrid classical-quantum approach\n• Adaptive learning mechanisms\n• Multi-phase optimization\n• Quantum state preparation\n• Efficient classical post-processing\n• Scalable to large problems",
  }
];

const tabuSearchInfo = [
  {
    title: "Overview",
    description: "A metaheuristic search method that uses memory structures (tabu lists) to avoid revisiting recent solutions. This allows the algorithm to escape local optima and explore new regions of the solution space effectively.",
  },
  {
    title: "Implementation Details",
    description: "• Dynamic tabu list management\n• Neighborhood exploration\n• Best solution tracking\n• Cost computation using QUBO matrix\n• Memory-based search guidance\n• Efficient solution space traversal",
  },
  {
    title: "Parameters",
    description: "• Maximum Iterations: Length of search process\n• Tabu Tenure: Duration solutions remain tabu\n• Neighborhood Size: Solutions evaluated per iteration\n\nLarger tenure prevents cycling, while larger neighborhood size increases exploration.",
  },
  {
    title: "Applications",
    description: "• Job scheduling\n• Vehicle routing\n• Network optimization\n• Facility location\n• Resource allocation\n• Pattern sequencing\n• Graph coloring",
  }
];

const geneticAlgorithmInfo = [
  {
    title: "Overview",
    description: "An evolutionary algorithm that mimics natural selection to optimize solutions. It maintains a population of candidate solutions and evolves them through selection, crossover, and mutation operations.",
  },
  {
    title: "Implementation Details",
    description: "• Population initialization\n• Fitness-proportional selection\n• Single-point crossover\n• Bit-flip mutation\n• Population evolution tracking\n• Cost-based fitness evaluation\n• Best solution preservation",
  },
  {
    title: "Parameters",
    description: "• Population Size: Number of solutions maintained\n• Number of Generations: Evolution cycles\n• Mutation Rate: Probability of bit flips\n\nLarger populations increase diversity, while higher mutation rates promote exploration.",
  },
  {
    title: "Applications",
    description: "• Circuit design\n• Parameter optimization\n• Feature selection\n• Path planning\n• Schedule optimization\n• Portfolio optimization\n• Network design",
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
              slidesToScroll: 1
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
              <Cpu className="h-8 w-8" />
              Quantum-Inspired Optimization
            </h2>
            <Carousel className="w-[95%] mx-auto" opts={{ 
              align: "start",
              containScroll: "trimSnaps",
              slidesToScroll: 1
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
              <Target className="h-8 w-8" />
              Tabu Search
            </h2>
            <Carousel className="w-[95%] mx-auto" opts={{ 
              align: "start",
              containScroll: "trimSnaps",
              slidesToScroll: 1
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
              <Dna className="h-8 w-8" />
              Genetic Algorithm
            </h2>
            <Carousel className="w-[95%] mx-auto" opts={{ 
              align: "start",
              containScroll: "trimSnaps",
              slidesToScroll: 1
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