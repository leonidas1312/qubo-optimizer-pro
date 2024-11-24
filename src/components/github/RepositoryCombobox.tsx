import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Repository {
  id: number;
  name: string;
  full_name: string;
  // Include other repository fields as needed
}

interface RepositoryComboboxProps {
  repositories?: Repository[];
  onSelectRepository: (repo: Repository) => void;
}

export function RepositoryCombobox({
  repositories = [],
  onSelectRepository,
}: RepositoryComboboxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const selectedRepository = repositories.find((repo) => repo.full_name === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedRepository ? selectedRepository.name : "Select repository..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search repository..." />
          <CommandList>
            <CommandEmpty>No repository found.</CommandEmpty>
            <CommandGroup>
              {repositories.map((repo) => (
                <CommandItem
                  key={repo.id}
                  value={repo.full_name}
                  onSelect={() => {
                    setValue(repo.full_name);
                    onSelectRepository(repo);
                    setOpen(false);
                  }}
                >
                  {repo.name}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === repo.full_name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}