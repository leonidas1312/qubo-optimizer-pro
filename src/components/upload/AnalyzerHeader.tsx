import { Button } from "@/components/ui/button";

interface AnalyzerHeaderProps {
  showCode: boolean;
  setShowCode: (show: boolean) => void;
}

export const AnalyzerHeader = ({ showCode, setShowCode }: AnalyzerHeaderProps) => {
  return (
    <div className="flex justify-end mb-4">
      <Button
        variant="outline"
        onClick={() => setShowCode(!showCode)}
        className="flex items-center gap-2"
      >
        {showCode ? "Show Info" : "Show Code"}
      </Button>
    </div>
  );
};