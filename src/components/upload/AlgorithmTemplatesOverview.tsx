import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlgorithmCard } from "@/components/solver/AlgorithmCard";
import { Star, Cpu, Target, Dna } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface AlgorithmTemplate {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  parameters: {
    name: string;
    type: string;
    description: string;
    default?: any;
  }[];
}

const algorithmTemplates: AlgorithmTemplate[] = [
  {
    id: "simulated-annealing",
    name: "Simulated Annealing",
    icon: <Star className="h-6 w-6" />,
    description: "A probabilistic technique for approximating the global optimum of a given function.",
    parameters: [
      {
        name: "initial_temperature",
        type: "number",
        description: "Starting temperature for the annealing process",
        default: 1000
      },
      {
        name: "cooling_rate",
        type: "number",
        description: "Rate at which temperature decreases",
        default: 0.99
      },
      {
        name: "max_iterations",
        type: "number",
        description: "Maximum number of iterations",
        default: 1000
      }
    ]
  },
  {
    id: "quantum-inspired",
    name: "Quantum-Inspired",
    icon: <Cpu className="h-6 w-6" />,
    description: "A hybrid quantum-classical algorithm combining quantum circuit simulation with reinforcement learning.",
    parameters: [
      {
        name: "num_layers",
        type: "number",
        description: "Number of quantum circuit layers",
        default: 2
      },
      {
        name: "max_iterations",
        type: "number",
        description: "Maximum optimization iterations",
        default: 100
      },
      {
        name: "num_samples",
        type: "number",
        description: "Number of samples to collect",
        default: 1000
      }
    ]
  },
  {
    id: "tabu-search",
    name: "Tabu Search",
    icon: <Target className="h-6 w-6" />,
    description: "A metaheuristic search method that uses memory structures to avoid revisiting recent solutions.",
    parameters: [
      {
        name: "tabu_tenure",
        type: "number",
        description: "Duration solutions remain tabu",
        default: 10
      },
      {
        name: "max_iterations",
        type: "number",
        description: "Maximum search iterations",
        default: 1000
      },
      {
        name: "neighborhood_size",
        type: "number",
        description: "Size of neighborhood to explore",
        default: 20
      }
    ]
  },
  {
    id: "genetic-algorithm",
    name: "Genetic Algorithm",
    icon: <Dna className="h-6 w-6" />,
    description: "An evolutionary algorithm that mimics natural selection to optimize solutions.",
    parameters: [
      {
        name: "population_size",
        type: "number",
        description: "Size of the population",
        default: 100
      },
      {
        name: "mutation_rate",
        type: "number",
        description: "Probability of mutation",
        default: 0.01
      },
      {
        name: "num_generations",
        type: "number",
        description: "Number of generations",
        default: 50
      }
    ]
  }
];

interface AlgorithmTemplatesOverviewProps {
  onSelectTemplate: (template: AlgorithmTemplate) => void;
}

export const AlgorithmTemplatesOverview = ({ onSelectTemplate }: AlgorithmTemplatesOverviewProps) => {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Choose a Template</h2>
          <p className="text-muted-foreground">
            Start with a pre-built algorithm template or create your own custom implementation
          </p>
        </div>

        <ScrollArea className="h-[600px] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {algorithmTemplates.map((template) => (
              <div key={template.id} className="space-y-4">
                <AlgorithmCard
                  title={template.name}
                  description={template.description}
                />
                <div className="space-y-2">
                  <h4 className="font-medium">Parameters:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {template.parameters.map((param) => (
                      <li key={param.name}>
                        {param.name}: {param.description} (default: {param.default})
                      </li>
                    ))}
                  </ul>
                </div>
                <Button 
                  onClick={() => {
                    onSelectTemplate(template);
                    toast.success(`Selected ${template.name} template`);
                  }}
                  className="w-full"
                >
                  Use Template
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
          <h3 className="font-medium">Creating a Custom QUBOt</h3>
          <p className="text-sm text-muted-foreground">
            To create a custom QUBOt, you'll need to provide:
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            <li>Input parameters: Variables that your algorithm will optimize</li>
            <li>Cost function: The objective function to minimize or maximize</li>
            <li>Algorithm logic: The core implementation of your optimization method</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};