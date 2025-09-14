/**
 * The `useAgentFilters` function returns query states for search and page with default values and
 * options.
 * @returns The `useAgentFilters` function is being returned, which utilizes the `useQueryStates` hook
 * from the "nuqs" library to manage query states for search and page parameters. The search parameter
 * is parsed as a string with a default value of an empty string, and the page parameter is parsed as
 * an integer with a default value of 10. Both parameters have options set to clear their values
 */
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";


const useAgentFilters = () => {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    page: parseAsInteger.withDefault(10).withOptions({ clearOnDefault: true }),
  });
};

export default useAgentFilters;
