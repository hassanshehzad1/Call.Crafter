/**
 * The `MeetingsListHeader` component in TypeScript React renders a header for a list of meetings with
 * a button to open a new meeting dialog.
 * @returns The `MeetingsListHeader` component is being returned. It includes a header section for a
 * list of meetings, with a title "My Meetings", a button to create a new meeting, and a placeholder
 * for filters.
 */
/**
 * The code defines a React component for displaying meetings data, with loading and error state
 * components included.
 * @returns The `MeetingsView` component is returning a `<div>` element that displays the JSON
 * stringified version of the `data` received from the `useSuspenseQuery` hook.
 */
"use client";

import { DataTable } from "@/components/data-table";
import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import EmptyState from "@/components/emty-state";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable data={data.items} columns={columns} />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first AI meeting"
          description="Schedule a meeting to connect with others."
        />
      )}
    </div>
  );
};

// Agents view loading
export const MeetingViewLoading = () => {
  return (
    <LoadingState
      title="Fetcing your Meetings"
      description="This may take a moment as we prepare the latest details for you. Sit back and relax!"
    />
  );
};

export const MeetingsViewError = () => {
  return (
    <ErrorState
      title="Oops! Trouble Loading Your Meetings 😔"
      description="Something went wrong on our end, but don’t worry—we’re working to fix it. Please try again in a moment or contact support if the issue persists!"
    />
  );
};
