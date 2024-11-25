import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Database } from "lucide-react";
import { useState } from "react";
import { Tables } from "@/integrations/supabase/types";

interface DatasetSelectorProps {
  datasets: Tables<"datasets">[] | null;
  onSelect: (datasetId: string) => void;
}

export const DatasetSelector = ({ datasets, onSelect }: DatasetSelectorProps) => {
  const [open, setOpen] = useState(false);

  if (!datasets) return null;

  return (
    <Command className="rounded-lg border shadow-md w-full">
      <CommandInput placeholder="Search datasets..." />
      <CommandGroup heading="Available Datasets">
        {datasets.map((dataset) => (
          <CommandItem
            key={dataset.id}
            onSelect={() => {
              onSelect(dataset.id);
              setOpen(false);
            }}
            className="flex items-center"
          >
            <Database className="h-4 w-4 mr-2" />
            <div className="flex flex-col">
              <span className="font-medium">{dataset.name}</span>
              <span className="text-xs text-muted-foreground">{dataset.description}</span>
            </div>
          </CommandItem>
        ))}
      </CommandGroup>
      <CommandEmpty>No datasets found.</CommandEmpty>
    </Command>
  );
};