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

export const AgentView = () => {
  const trpc = useTRPC();
  const { data, isLoading, isError } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions()
  );

  return <div>{JSON.stringify(data, null, 2)}</div>;
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
