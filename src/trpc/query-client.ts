/**
 * The function `makeQueryClient` creates a new QueryClient instance with default options for handling
 * queries.
 * @returns A function named `makeQueryClient` is being returned. This function creates a new instance
 * of `QueryClient` with default options set for queries, dehydrate, and hydrate. The
 * `shouldDehydrateQuery` function is customized to check if the query should be dehydrated based on
 * its status. The `staleTime` for queries is set to 30 seconds. The `super
 */
import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from '@tanstack/react-query';
// import superjson from 'superjson';
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
      },
      dehydrate: {
        // serializeData: superjson.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
      hydrate: {
        // deserializeData: superjson.deserialize,
      },
    },
  });
}