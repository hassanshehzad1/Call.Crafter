import { cn } from "@/lib/utils";
import { ChevronsUpDownIcon } from "lucide-react";
import { ReactNode, useState } from "react";
import { Button } from "./ui/button";
import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "@/components/ui/command";
import { placeholder } from "drizzle-orm";

interface Props {
  options: Array<{
    id: string;
    value: string;
    children: ReactNode;
  }>;

  onSelect: (value: string) => void;
  onSearch: (value: string) => void;
  value: string;
  placdeholder: string;
  isSearchable: boolean;
  className: string;
}

export const commandSelect = ({
  options,
  onselect,
  onSearch,
  value,
  placeholder = "Select an option",
  className,
}: Props) => {
  const [open, setOpen] = useState(false);
  const selectedoption = options.find((option) => option.value === value);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        type="button"
        variant="outline"
        className={cn(
          "h-9 justify-between font-normal px-2 ",
          !selectedoption && "text-muted-foreground",
          className
        )}
      >
        <div>{selectedoption?.children ?? placeholder}</div>
      </Button>
      <CommandResponsiveDialog
        open={open}
        onOpenChange={setOpen}
        shouldFilter={!onSearch}
      >
        <CommandInput placeholder="Search..." onValueChange={onSearch} />
        <CommandList>
          <CommandEmpty>
            <span className="text-muted-foreground text-sm">
              No Options found
            </span>
          </CommandEmpty>
          {options.map((option) => (
            <CommandItem
              key={option.id}
              onSelect={() => {
                onSelect(option.value);
                setOpen(false);
              }}
            >
              {option.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
};
