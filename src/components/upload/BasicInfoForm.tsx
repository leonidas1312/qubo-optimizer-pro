import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface BasicInfoFormProps {
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
}

export const BasicInfoForm = ({
  name,
  setName,
  description,
  setDescription,
}: BasicInfoFormProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="name">Solver Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name for your solver"
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Explain how your solver works and what problems it can solve"
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};