import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const solverInfo = {
  "simulated-annealing": {
    name: "Simulated Annealing",
    description: "A probabilistic technique for approximating the global optimum of a given function, inspired by the annealing process in metallurgy.",
    equation: "P(\\Delta E) = e^{-\\Delta E/(k_B T)}",
    installation: "pip install simanneal",
    limitations: "Free version supports unlimited variables. Performance may degrade with problem size.",
    advantages: "Simple to implement, works well for many problems, no quantum hardware required.",
    complexity: "Time complexity: O(n²) per iteration"
  },
  "quantum-inspired": {
    name: "Quantum-Inspired Optimization",
    description: "Classical algorithms that mimic quantum phenomena to solve optimization problems.",
    equation: "\\min_{x \\in \\{0,1\\}^n} x^T Q x",
    installation: "pip install qiskit",
    limitations: "Unlimited variables in free version. May require significant classical computing resources.",
    advantages: "No quantum hardware needed, can handle larger problems than real quantum computers.",
    complexity: "Varies by implementation"
  },
  "gurobi": {
    name: "Gurobi Optimizer",
    description: "Commercial mathematical programming solver for linear programming, mixed-integer programming, and other mathematical optimization problems.",
    equation: "\\min_{x} c^T x \\text{ s.t. } Ax \\leq b",
    installation: "conda install gurobi",
    limitations: "Free academic license. Commercial license required for business use. Limited to 2000 variables in free version.",
    advantages: "Very fast for linear and quadratic problems, professional support available.",
    complexity: "Exponential worst case, but often practical for medium-sized problems"
  },
  "qbsolv": {
    name: "QBSolv",
    description: "D-Wave's open-source solver for QUBO problems that decomposes large problems into smaller pieces.",
    equation: "\\min_{x} x^T Q x, x_i \\in \\{0,1\\}",
    installation: "pip install dwave-qbsolv",
    limitations: "Free and open-source. Can handle problems with thousands of variables.",
    advantages: "Can solve larger problems than D-Wave hardware by decomposition.",
    complexity: "Depends on decomposition size and method"
  },
  "dwave-sdk": {
    name: "D-Wave SDK",
    description: "Software development kit for accessing D-Wave's quantum annealing hardware.",
    equation: "H = \\sum_i h_i \\sigma^z_i + \\sum_{i<j} J_{ij} \\sigma^z_i \\sigma^z_j",
    installation: "pip install dwave-ocean-sdk",
    limitations: "Free cloud access limited to small problems (< 100 variables). Paid plans for larger problems.",
    advantages: "Access to real quantum hardware, good for certain optimization problems.",
    complexity: "20µs per annealing cycle, independent of problem size"
  }
};

export const SolverInfo = ({ selectedSolver }: { selectedSolver: string }) => {
  const info = solverInfo[selectedSolver as keyof typeof solverInfo];
  
  if (!info) return null;

  return (
    <Card className="p-6 mt-4">
      <h3 className="text-xl font-semibold mb-4">{info.name}</h3>
      <p className="text-muted-foreground mb-4">{info.description}</p>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="equation">
          <AccordionTrigger>Mathematical Formulation</AccordionTrigger>
          <AccordionContent>
            <div className="p-4 bg-muted rounded-md">
              <InlineMath>{info.equation}</InlineMath>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="installation">
          <AccordionTrigger>Installation Instructions</AccordionTrigger>
          <AccordionContent>
            <code className="block p-4 bg-muted rounded-md">{info.installation}</code>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="limitations">
          <AccordionTrigger>Limitations</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">{info.limitations}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="advantages">
          <AccordionTrigger>Advantages</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">{info.advantages}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="complexity">
          <AccordionTrigger>Computational Complexity</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">{info.complexity}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};