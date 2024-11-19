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

interface Constraint {
  id?: string;
  expression: string;
  type: "<=" | "=" | ">=";
  rhs: number;
}

interface ConstraintFormProps {
  onSubmit: (constraint: Omit<Constraint, "id">) => void;
  initialData?: Constraint | null;
  onClose?: () => void;
}

export const ConstraintForm = ({ onSubmit, initialData, onClose }: ConstraintFormProps) => {
  const [expression, setExpression] = useState(initialData?.expression ?? "");
  const [type, setType] = useState<Constraint["type"]>(initialData?.type ?? "<=");
  const [rhs, setRhs] = useState<string>(initialData?.rhs?.toString() ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      expression,
      type,
      rhs: Number(rhs),
    });
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="expression" className="text-sm font-medium">
          Expression
        </label>
        <Input
          id="expression"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="e.g., 2x + 3y"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="type" className="text-sm font-medium">
          Constraint Type
        </label>
        <Select value={type} onValueChange={(value: Constraint["type"]) => setType(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="<=">≤</SelectItem>
            <SelectItem value="=">=</SelectItem>
            <SelectItem value=">=">≥</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="rhs" className="text-sm font-medium">
          Right-Hand Side
        </label>
        <Input
          id="rhs"
          type="number"
          value={rhs}
          onChange={(e) => setRhs(e.target.value)}
          required
        />
      </div>

      <Button type="submit" className="w-full">
        {initialData ? "Update" : "Add"} Constraint
      </Button>
    </form>
  );
};