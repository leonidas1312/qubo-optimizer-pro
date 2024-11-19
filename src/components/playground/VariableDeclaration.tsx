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
              onSubmit={(variable) => handleAddVariable(variable)}
              initialData={editingVariable}
            />
          </DialogContent>
        </Dialog>
      </div>

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

interface VariableFormProps {
  onSubmit: (variable: Omit<Variable, "id">) => void;
  initialData?: Variable | null;
}

const VariableForm = ({ onSubmit, initialData }: VariableFormProps) => {
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
            <SelectValue />
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