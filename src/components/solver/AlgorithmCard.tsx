import { Card } from "@/components/ui/card";

interface AlgorithmCardProps {
  title: string;
  description: string;
}

export const AlgorithmCard = ({
  title,
  description,
}: AlgorithmCardProps) => {
  return (
    <Card className="p-8 h-full bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-xl border-white/5 hover:border-white/10 transition-all duration-300 hover:translate-y-[-2px]">
      <div className="space-y-4">
        <h3 className="text-2xl font-medium text-white">{title}</h3>
        <p className="text-gray-400 leading-relaxed whitespace-pre-line">{description}</p>
      </div>
    </Card>
  );
};