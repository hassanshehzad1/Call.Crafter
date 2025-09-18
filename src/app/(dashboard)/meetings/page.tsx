/**
 * This TypeScript React function prefetches meeting data, dehydrates the query client state, and
 * renders a MeetingsView component with error and loading fallbacks.
 * @returns The `page` function is returning a JSX structure that includes a `HydrationBoundary`
 * component wrapping a `Suspense` component, which in turn wraps an `ErrorBoundary` component that
 * contains a `MeetingsView` component. The `HydrationBoundary` component is passing the dehydrated
 * state of the `queryClient` as a prop. The `Suspense` component provides a fallback
*/
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import MeetingsListHeader from "@/modules/meetings/ui/components/meetings-list-header";
import {
  MeetingsView,
  MeetingsViewError,
  MeetingViewLoading,
} from "@/modules/meetings/ui/view/meeting-views";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}));
  return (
    <>
      <MeetingsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingViewLoading />}>
          <ErrorBoundary fallback={<MeetingsViewError />}>
            <MeetingsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default page;
