import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface AlgorithmCardProps {
  title: string;
  description: string;
  features: string[];
}

export const AlgorithmCard = ({
  title,
  description,
}: AlgorithmCardProps) => {
  return (
    <Card className="p-8 bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-xl border-white/5 hover:border-white/10 transition-all duration-300 group-hover:translate-y-[-2px]">
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <Check className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <h2 className="text-2xl font-medium text-white mb-4">{title}</h2>
            <p className="text-gray-400 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};