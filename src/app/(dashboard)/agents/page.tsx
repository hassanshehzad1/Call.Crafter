/**
 * The function `page` prefetches data, dehydrates the query client state, and renders an `AgentView`
 * component within error and suspense boundaries.
 * @returns The `page` function is returning a JSX structure that includes a `HydrationBoundary`
 * component wrapping a `Suspense` component, which in turn wraps an `ErrorBoundary` component that
 * renders the `AgentView` component. The `HydrationBoundary` component is passing the dehydrated state
 * of the `queryClient` as a prop. The `Suspense` component has a fallback of
 */
import {
  AgentsViewError,
  AgentView,
  AgentViewLoading,
} from "./ui/views/agent-view";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";
import { Suspense } from "react";
import LoadingState from "@/components/loading-state";
import { ErrorBoundary } from "react-error-boundary";

const page = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentViewLoading />}>
        <ErrorBoundary fallback={<AgentsViewError />}>
          <AgentView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default page;
