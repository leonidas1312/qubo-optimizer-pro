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
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Optimization Playground</h1>
        
        <TemplateSelector onTemplateSelect={handleTemplateSelect} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <ConstraintsInput 
              constraints={constraints}
              setConstraints={setConstraints}
            />
            <MatrixUpload />
          </div>
          
          <div className="space-y-8">
            <TransformationSolution />
            <SolverConfig />
            <ResultsChart />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Playground;