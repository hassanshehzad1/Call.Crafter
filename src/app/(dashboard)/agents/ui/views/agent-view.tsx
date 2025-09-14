/**
 * The above code defines components for displaying agent data, handling loading state, and handling
 * error state in a TypeScript React application using TRPC and React Query.
 * @returns The `AgentView` component returns a div displaying the JSON stringified `data` fetched
 * using `useSuspenseQuery` hook. The `AgentViewLoading` component returns a loading state with a title
 * and description for when the agents data is being fetched. The `AgentsViewError` component returns
 * an error state with a title and description for when there is an error loading the agents data.
 */
"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import LoadingState from "@/components/loading-state";
import ErrorState from "@/components/error-state";
import { DataTable } from "@/modules/agents/ui/components/data-table";
import { columns } from "@/modules/agents/ui/components/columns";
import EmptyState from "@/components/emty-state";
import useAgentFilters from "@/modules/agents/hooks/use-agent-filters";
import AgentsDataPagination from "@/modules/agents/ui/components/agents-data-pagination";

export const AgentView = () => {
  const [filters, setFilters] = useAgentFilters();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      {/* {console.log(data)} */}
      <DataTable data={data.items} columns={columns} />
      <AgentsDataPagination
        page={filters.page}
        totalPages={data.totalPage}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first AI agent"
          description="Create an agent to join our meetings. Each agent will follow your instructions and can interact with participants durning the call"
        />
      )}
    </div>
  );
};

// Agents view loading
export const AgentViewLoading = () => {
  return (
    <LoadingState
      title="Fetcing your Agents"
      description="This may take a moment as we prepare the latest details for you. Sit back and relax!"
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Oops! Trouble Loading Your Agents 😔"
      description="Something went wrong on our end, but don’t worry—we’re working to fix it. Please try again in a moment or contact support if the issue persists!"
    />
  );
};
