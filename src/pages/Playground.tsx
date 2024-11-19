import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { VariableDeclaration } from "@/components/playground/VariableDeclaration";
import { ConstraintsInput } from "@/components/playground/ConstraintsInput";
import { TransformationSolution } from "@/components/playground/TransformationSolution";
import { TemplateSelector } from "@/components/playground/TemplateSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProblemTemplate } from "@/utils/problemTemplates";
import { useState } from "react";

const Playground = () => {
  const handleTemplateSelect = (template: ProblemTemplate) => {
    // TODO: Implement state management to handle template data
    console.log("Selected template:", template);
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
            <VariableDeclaration />
          </TabsContent>

          <TabsContent value="constraints" className="space-y-4">
            <ConstraintsInput />
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