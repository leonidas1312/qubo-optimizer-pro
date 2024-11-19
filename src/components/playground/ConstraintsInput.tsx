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
import { Pencil, Trash2, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ConstraintForm } from "./constraint/ConstraintForm";

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

  const handleEditConstraint = (constraint: Omit<Constraint, "id">) => {
    if (editingConstraint) {
      const updatedConstraints = constraints.map((c) =>
        c.id === editingConstraint.id ? { ...constraint, id: editingConstraint.id } : c
      );
      setConstraints(updatedConstraints);
      setEditingConstraint(null);
      toast({
        title: "Constraint updated",
        description: "The constraint has been updated successfully.",
      });
    }
  };

  const handleDeleteConstraint = (id: string) => {
    setConstraints(constraints.filter((c) => c.id !== id));
    toast({
      title: "Constraint deleted",
      description: "The constraint has been removed successfully.",
    });
  };

  return (
    <section className="space-y-4">
      <header className="flex justify-between items-center">
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
              onSubmit={handleAddConstraint}
              onClose={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </header>

      <Dialog open={!!editingConstraint} onOpenChange={(open) => !open && setEditingConstraint(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Constraint</DialogTitle>
          </DialogHeader>
          {editingConstraint && (
            <ConstraintForm
              initialData={editingConstraint}
              onSubmit={handleEditConstraint}
              onClose={() => setEditingConstraint(null)}
            />
          )}
        </DialogContent>
      </Dialog>

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
    </section>
  );
};