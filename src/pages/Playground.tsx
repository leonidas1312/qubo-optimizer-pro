import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { VariableDeclaration } from "@/components/playground/VariableDeclaration";
import { ConstraintsInput } from "@/components/playground/ConstraintsInput";
import { TransformationSolution } from "@/components/playground/TransformationSolution";
import { TemplateSelector } from "@/components/playground/TemplateSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProblemTemplate } from "@/utils/problemTemplates";
import { useState } from "react";

interface Variable {
  id: string;
  name: string;
  type: "binary" | "integer" | "continuous";
  lowerBound?: number;
  upperBound?: number;
}

interface Constraint {
  id: string;
  expression: string;
  type: "<=" | "=" | ">=";
  rhs: number;
}

const Playground = () => {
  const [variables, setVariables] = useState<Variable[]>([]);
  const [constraints, setConstraints] = useState<Constraint[]>([]);

  const handleTemplateSelect = (template: ProblemTemplate) => {
    // Convert template variables to our Variable interface format
    const newVariables = template.variables.map((v) => ({
      id: crypto.randomUUID(),
      ...v
    }));
    setVariables(newVariables);

    // Convert template constraints to our Constraint interface format
    const newConstraints = template.constraints.map((expression) => ({
      id: crypto.randomUUID(),
      expression,
      type: "<=" as const,
      rhs: 0
    }));
    setConstraints(newConstraints);
  };

  return (
    <DashboardLayout>
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8 gradient-text animate-fade-in">
          Playground
        </h1>

        <TemplateSelector onTemplateSelect={handleTemplateSelect} />

        <Tabs defaultValue="variables" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="variables">Variables</TabsTrigger>
            <TabsTrigger value="constraints">Constraints</TabsTrigger>
            <TabsTrigger value="solution">Transform & Solve</TabsTrigger>
          </TabsList>

          <TabsContent value="variables" className="space-y-4">
            <VariableDeclaration 
              variables={variables}
              setVariables={setVariables}
            />
          </TabsContent>

          <TabsContent value="constraints" className="space-y-4">
            <ConstraintsInput 
              constraints={constraints}
              setConstraints={setConstraints}
            />
          </TabsContent>

          <TabsContent value="solution" className="space-y-4">
            <TransformationSolution />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Playground;