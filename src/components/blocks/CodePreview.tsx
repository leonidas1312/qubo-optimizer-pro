import { CodeEditor } from "@/components/playground/editor/CodeEditor";

interface CodePreviewProps {
  solver: any;
  dataset: any;
  hardware: any;
}

export const CodePreview = ({ solver, dataset, hardware }: CodePreviewProps) => {
  const generateCode = () => {
    if (!solver || !dataset || !hardware) {
      return "# Select blocks to generate code";
    }

    return `
import numpy as np
from ${solver.name.toLowerCase()} import solve_qubo

# Load dataset
data = np.load("${dataset.file_path}")
qubo_matrix = data[0]
constant = data[1]

# Configure solver parameters
solver_params = ${JSON.stringify(solver.solver_parameters, null, 2)}

# Configure hardware
hardware_config = {
    "provider": "${hardware.name}",
    "specs": ${JSON.stringify(hardware.specs, null, 2)}
}

# Run optimization
solution, cost, iterations_cost, time_taken = solve_qubo(
    qubo_matrix=qubo_matrix,
    constant=constant,
    solver_type="${solver.solver_type}",
    parameters=solver_params,
    hardware_config=hardware_config
)

print(f"Best solution found: {solution}")
print(f"Cost: {cost}")
print(f"Time taken: {time_taken}s")
`.trim();
  };

  return (
    <div className="h-full">
      <CodeEditor
        value={generateCode()}
        onChange={() => {}}
        language="python"
        className="h-full"
      />
    </div>
  );
};