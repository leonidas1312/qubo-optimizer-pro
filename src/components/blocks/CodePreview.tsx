import { CodeEditor } from "@/components/playground/editor/CodeEditor";

interface CodePreviewProps {
  connections: any[];
}

export const CodePreview = ({ connections }: CodePreviewProps) => {
  const generateCode = () => {
    const solver = connections.find((c) => c.type === "solver");
    const dataset = connections.find((c) => c.type === "dataset");
    const hardware = connections.find((c) => c.type === "hardware");

    return `# Generated Python Code
${solver ? `# Solver: ${solver.name}` : "# No solver selected"}
${dataset ? `# Dataset: ${dataset.name}` : "# No dataset selected"}
${hardware ? `# Hardware: ${hardware.name}` : "# No hardware selected"}

def main():
    # Initialize components
    ${solver ? `solver = load_solver("${solver.name}")` : "# No solver"}
    ${dataset ? `data = load_dataset("${dataset.name}")` : "# No dataset"}
    ${hardware ? `hardware = initialize_hardware("${hardware.name}")` : "# No hardware"}

    # Run optimization
    if solver and data and hardware:
        result = solver.optimize(data, hardware=hardware)
        return result
    else:
        return "Missing components"

if __name__ == "__main__":
    main()
`;
  };

  return (
    <div className="flex-1">
      <CodeEditor
        value={generateCode()}
        onChange={() => {}}
        language="python"
        className="h-[calc(100vh-12rem)]"
      />
    </div>
  );
};