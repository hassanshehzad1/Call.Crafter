/**
 * The code defines a React component for displaying meetings data, with loading and error state
 * components included.
 * @returns The `MeetingsView` component is returning a `<div>` element that displays the JSON
 * stringified version of the `data` received from the `useSuspenseQuery` hook.
 */
"use client";

import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {  useSuspenseQuery } from "@tanstack/react-query";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

  return <div>{JSON.stringify(data)}</div>;
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