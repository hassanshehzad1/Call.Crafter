/**
 * This TypeScript React function prefetches data for a specific agent ID and renders a view component
 * with error and loading fallbacks.
 * @param {Props}  - The code you provided is a React component called `Page` that fetches data using
 * `trpc` and React Query. Here's a breakdown of the code:
 * @returns The `Page` component is being returned. This component takes in a `params` prop which is a
 * Promise containing an object with an `agentId` property. It then extracts the `agentId` from the
 * resolved Promise, prefetches a query using `queryClient.prefetchQuery`, and renders a
 * `HydrationBoundary` component with the dehydrated state of the queryClient. Inside the
 */
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  AgentIdView,
  AgentIdViewError,
  AgentIdViewLoading,
} from "../../../../modules/agents/ui/components/views/agent-id-views";

interface Props {
  params: Promise<{ agentId: string }>;
}

const Page = async ({ params }: Props) => {
  const { agentId } = await params;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentIdViewLoading />}>
        <ErrorBoundary fallback={<AgentIdViewError />}>
          <AgentIdView agentId={agentId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
