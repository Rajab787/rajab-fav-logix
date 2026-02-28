import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useFetchWithLoader = <T>({
  queryKey,
  queryFn,
  enabled = true,
  minLoadingTime = 3000,
  staleTime = 1000 * 60,
}: {
  queryKey: string[];
  queryFn: () => Promise<T>;
  enabled?: boolean;
  minLoadingTime?: number;
  staleTime?: number;
}): UseQueryResult<T, unknown> => {
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
  });

  // useEffect(() => {
  //   setFetchingPolygon(query.isLoading || query.isFetching);
  // }, [query.isLoading, query.isFetching, setFetchingPolygon]);

  return query;
};
