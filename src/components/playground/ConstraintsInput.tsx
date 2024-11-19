import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Constraint {
  id: string;
  expression: string;
  type: "<=" | "=" | ">=";
  rhs: number;
}

interface ConstraintsInputProps {
  constraints: Constraint[];
  setConstraints: (constraints: Constraint[]) => void;
}

export const ConstraintsInput = ({ constraints, setConstraints }: ConstraintsInputProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingConstraint, setEditingConstraint] = useState<Constraint | null>(null);
  const { toast } = useToast();

  const handleAddConstraint = (constraint: Omit<Constraint, "id">) => {
    const newConstraint = {
      ...constraint,
      id: crypto.randomUUID(),
    };
    
    setConstraints([...constraints, newConstraint]);
    setIsDialogOpen(false);
    toast({
      title: "Constraint added",
      description: "The constraint has been added successfully.",
    });
  };

  const handleDeleteConstraint = (id: string) => {
    setConstraints(constraints.filter((c) => c.id !== id));
    toast({
      title: "Constraint deleted",
      description: "The constraint has been removed successfully.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Constraints</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Constraint
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Constraint</DialogTitle>
            </DialogHeader>
            <ConstraintForm
              onSubmit={(constraint) => handleAddConstraint(constraint)}
              initialData={editingConstraint}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Expression</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>RHS</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {constraints.map((constraint) => (
              <TableRow key={constraint.id}>
                <TableCell>{constraint.expression}</TableCell>
                <TableCell>{constraint.type}</TableCell>
                <TableCell>{constraint.rhs}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingConstraint(constraint)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteConstraint(constraint.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

interface ConstraintFormProps {
  onSubmit: (constraint: Omit<Constraint, "id">) => void;
  initialData?: Constraint | null;
}

const ConstraintForm = ({ onSubmit, initialData }: ConstraintFormProps) => {
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
            <SelectValue />
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