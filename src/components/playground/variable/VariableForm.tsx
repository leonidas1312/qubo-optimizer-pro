import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Variable {
  id?: string;
  name: string;
  type: "binary" | "integer" | "continuous";
  lowerBound?: number;
  upperBound?: number;
}

interface VariableFormProps {
  onSubmit: (variable: Omit<Variable, "id">) => void;
  initialData?: Variable | null;
  onClose?: () => void;
}

export const VariableForm = ({ onSubmit, initialData, onClose }: VariableFormProps) => {
  const [name, setName] = useState(initialData?.name ?? "");
  const [type, setType] = useState<Variable["type"]>(initialData?.type ?? "binary");
  const [lowerBound, setLowerBound] = useState<string>(
    initialData?.lowerBound?.toString() ?? ""
  );
  const [upperBound, setUpperBound] = useState<string>(
    initialData?.upperBound?.toString() ?? ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      type,
      lowerBound: lowerBound ? Number(lowerBound) : undefined,
      upperBound: upperBound ? Number(upperBound) : undefined,
    });
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Variable Name
        </label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="type" className="text-sm font-medium">
          Variable Type
        </label>
        <Select value={type} onValueChange={(value: Variable["type"]) => setType(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="binary">Binary</SelectItem>
            <SelectItem value="integer">Integer</SelectItem>
            <SelectItem value="continuous">Continuous</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="lowerBound" className="text-sm font-medium">
            Lower Bound
          </label>
          <Input
            id="lowerBound"
            type="number"
            value={lowerBound}
            onChange={(e) => setLowerBound(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="upperBound" className="text-sm font-medium">
            Upper Bound
          </label>
          <Input
            id="upperBound"
            type="number"
            value={upperBound}
            onChange={(e) => setUpperBound(e.target.value)}
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        {initialData ? "Update" : "Add"} Variable
      </Button>
    </form>
  );
};