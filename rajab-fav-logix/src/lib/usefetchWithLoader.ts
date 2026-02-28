import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { usePolygonStore } from "@/global/usePolygonStore";
import { useEffect } from "react";

export const useFetchWithLoader = <T>({
  queryKey,
  queryFn,
  enabled = true,
  minLoadingTime = 3000,
  staleTime = 1000 * 60,
  cacheTime = 1000 * 60 * 5,
}: {
  queryKey: string[];
  queryFn: () => Promise<T>;
  enabled?: boolean;
  minLoadingTime?: number;
  staleTime?: number;
  cacheTime?: number;
}): UseQueryResult<T, unknown> => {
  // const { setFetchingPolygon } = usePolygonStore();

  const query = useQuery<T>({
    queryKey,
    queryFn: async () => {
      const start = Date.now();
      const result = await queryFn();
      const elapsed = Date.now() - start;

      if (elapsed < minLoadingTime) {
        await new Promise((resolve) =>
          setTimeout(resolve, minLoadingTime - elapsed)
        );
      }

      return result;
    },
    enabled,
    staleTime,
    cacheTime,
  });

  // useEffect(() => {
  //   setFetchingPolygon(query.isLoading || query.isFetching);
  // }, [query.isLoading, query.isFetching, setFetchingPolygon]);

  return query;
};
