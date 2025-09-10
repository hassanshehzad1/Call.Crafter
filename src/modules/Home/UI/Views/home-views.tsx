/**
 * The `HomeView` component uses `useTRPC` to fetch a greeting message from the server and displays it
 * in the UI.
 * @returns The `HomeView` component is being returned. It uses the `useTRPC` hook to get the TRPC
 * client instance and the `useQuery` hook from `react-query` to fetch data using the `hello` query
 * from the TRPC client with the options `{text: "Antonio"}`. The component then displays the
 * `greeting` data from the fetched response in a
 */
"use client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
const HomeView = () => {
  const trpc =  useTRPC();
  const {data} = useQuery(trpc.hello.queryOptions({text:"Antonio"}))
  return (
    
    
      <div className="flex flex-col gap-4 gap-y-4">
        {data?.greeting}
    </div>
  );
};

export default HomeView;
