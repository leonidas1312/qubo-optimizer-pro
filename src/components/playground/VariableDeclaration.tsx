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
import { VariableForm } from "./variable/VariableForm";

interface Variable {
  id: string;
  name: string;
  type: "binary" | "integer" | "continuous";
  lowerBound?: number;
  upperBound?: number;
}

interface VariableDeclarationProps {
  variables: Variable[];
  setVariables: (variables: Variable[]) => void;
}

export const VariableDeclaration = ({ variables, setVariables }: VariableDeclarationProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVariable, setEditingVariable] = useState<Variable | null>(null);
  const { toast } = useToast();

  const handleAddVariable = (variable: Omit<Variable, "id">) => {
    const newVariable = {
      ...variable,
      id: crypto.randomUUID(),
    };
    
    setVariables([...variables, newVariable]);
    setIsDialogOpen(false);
    toast({
      title: "Variable added",
      description: `Variable ${variable.name} has been added successfully.`,
    });
  };

  const handleEditVariable = (variable: Omit<Variable, "id">) => {
    if (editingVariable) {
      const updatedVariables = variables.map((v) =>
        v.id === editingVariable.id ? { ...variable, id: editingVariable.id } : v
      );
      setVariables(updatedVariables);
      setEditingVariable(null);
      toast({
        title: "Variable updated",
        description: `Variable ${variable.name} has been updated successfully.`,
      });
    }
  };

  const handleDeleteVariable = (id: string) => {
    setVariables(variables.filter((v) => v.id !== id));
    toast({
      title: "Variable deleted",
      description: "The variable has been removed successfully.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Variables</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Variable
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Variable</DialogTitle>
            </DialogHeader>
            <VariableForm
              onSubmit={handleAddVariable}
              onClose={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={!!editingVariable} onOpenChange={(open) => !open && setEditingVariable(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Variable</DialogTitle>
          </DialogHeader>
          {editingVariable && (
            <VariableForm
              initialData={editingVariable}
              onSubmit={handleEditVariable}
              onClose={() => setEditingVariable(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Lower Bound</TableHead>
              <TableHead>Upper Bound</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variables.map((variable) => (
              <TableRow key={variable.id}>
                <TableCell>{variable.name}</TableCell>
                <TableCell className="capitalize">{variable.type}</TableCell>
                <TableCell>{variable.lowerBound ?? "-"}</TableCell>
                <TableCell>{variable.upperBound ?? "-"}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingVariable(variable)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteVariable(variable.id)}
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