import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

import React from "react";

const useAgentFilters = () => {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    page: parseAsInteger.withDefault(10).withOptions({ clearOnDefault: true }),
  });
};

export default useAgentFilters;
