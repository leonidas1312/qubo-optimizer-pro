import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Server, Cpu } from "lucide-react";
import { useState } from "react";
import { Tables } from "@/integrations/supabase/types";

interface HardwareSelectorProps {
  hardware: Tables<"hardware_providers">[] | null;
  onSelect: (hardwareId: string) => void;
}

export const HardwareSelector = ({ hardware, onSelect }: HardwareSelectorProps) => {
  const [open, setOpen] = useState(false);

  if (!hardware) return null;

  return (
    <Command className="rounded-lg border shadow-md w-full">
      <CommandInput placeholder="Search hardware..." />
      <CommandGroup heading="Available Hardware">
        {hardware.map((hw) => (
          <CommandItem
            key={hw.id}
            onSelect={() => {
              onSelect(hw.id);
              setOpen(false);
            }}
            className="flex items-center"
          >
            {hw.provider_type === 'CPU' ? (
              <Cpu className="h-4 w-4 mr-2" />
            ) : (
              <Server className="h-4 w-4 mr-2" />
            )}
            <div className="flex flex-col">
              <span className="font-medium">{hw.name}</span>
              <span className="text-xs text-muted-foreground">{hw.description}</span>
            </div>
          </CommandItem>
        ))}
      </CommandGroup>
      <CommandEmpty>No hardware found.</CommandEmpty>
    </Command>
  );
};