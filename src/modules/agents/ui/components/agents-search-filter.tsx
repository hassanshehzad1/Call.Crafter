/**
 * The `AgentsSearchFilter` component in TypeScript React renders a search input field with a search
 * icon for filtering agents by name.
 * @returns The `AgentsSearchFilter` component is being returned. It consists of an input field for
 * filtering by name, with a placeholder text "Filter by name", and a search icon displayed on the left
 * side of the input field. The component also utilizes the `useAgentFilters` custom hook to manage the
 * filter state and a local state `isDialogOpen` using the `useState` hook.
 */
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import useAgentFilters from "../../hooks/use-agent-filters";
import { useState } from "react";

const AgentsSearchFilter = () => {
  const [filter, setFilters] = useAgentFilters();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="relative">
      <Input
        placeholder="Filter by name"
        className="h-9 bg-white w-[200px] pl-7"
        value={filter.search}
        onChange={(e) => setFilters({ search: e.target.value })}
      />
      <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"/>
    </div>
  );
};

export default AgentsSearchFilter;
