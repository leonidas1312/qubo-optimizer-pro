import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MatrixUpload } from "@/components/upload/MatrixUpload";
import { SolverConfig } from "@/components/solver/SolverConfig";
import { ResultsChart } from "@/components/visualization/ResultsChart";
import { TransformationSolution } from "@/components/playground/TransformationSolution";
import { TemplateSelector } from "@/components/playground/TemplateSelector";
import { ConstraintsInput } from "@/components/playground/ConstraintsInput";
import { useState } from "react";
import { ProblemTemplate } from "@/utils/problemTemplates";

const Playground = () => {
  const [constraints, setConstraints] = useState<any[]>([]);

  const handleTemplateSelect = (template: ProblemTemplate) => {
    // Handle template selection
    console.log("Selected template:", template);
  };

  return (
    <DashboardLayout>
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 gradient-text">Optimization Playground</h1>
        
        <TemplateSelector onTemplateSelect={handleTemplateSelect} />
        
        <div className="grid lg:grid-cols-2 gap-8">
          <section className="flex flex-col gap-8">
            <ConstraintsInput 
              constraints={constraints}
              setConstraints={setConstraints}
            />
            <MatrixUpload />
          </section>
          
          <section className="flex flex-col gap-8">
            <TransformationSolution />
            <SolverConfig />
            <ResultsChart />
          </section>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Playground;