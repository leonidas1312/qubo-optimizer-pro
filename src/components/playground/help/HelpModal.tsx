import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

export const HelpModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <HelpCircle className="mr-2 h-4 w-4" />
          Help
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Playground Help</DialogTitle>
          <DialogDescription>
            Learn how to use the playground effectively
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <section>
            <h3 className="font-semibold mb-2">Variables</h3>
            <p>Define your variables with appropriate bounds and types.</p>
            <pre className="bg-muted p-2 rounded-md mt-2">
              {`x: binary
y: integer [0, 10]
z: continuous [-1, 1]`}
            </pre>
          </section>
          <section>
            <h3 className="font-semibold mb-2">Constraints</h3>
            <p>Add constraints using mathematical expressions.</p>
            <pre className="bg-muted p-2 rounded-md mt-2">
              {`x + y <= 5
2x - 3y = 0
z >= -0.5`}
            </pre>
          </section>
          <section>
            <h3 className="font-semibold mb-2">Objective Function</h3>
            <p>Define what you want to minimize or maximize.</p>
            <pre className="bg-muted p-2 rounded-md mt-2">
              {`minimize: 2x + 3y - z`}
            </pre>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};