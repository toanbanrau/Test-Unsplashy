import { useState, useEffect, useRef, useCallback } from "react";

interface UseInfiniteScrollProps<T extends { id: string }> {
  initialData: T[];
  fetchData: (page: number, query?: string) => Promise<T[]>;
  query?: string;
  threshold?: number;
}

export function useInfiniteScroll<T extends { id: string }>({
  initialData,
  fetchData,
  query = "",
  threshold = 100
}: UseInfiniteScrollProps<T>) {
  const [dataList, setDataList] = useState<T[]>(initialData);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const isFetchingRef = useRef<boolean>(false);
  const isInitialMount = useRef<boolean>(true);
  const currentQuery = useRef<string>(query);

 
  useEffect(() => {
    
    if (currentQuery.current !== query) {
      currentQuery.current = query;
      setDataList(initialData);
      setPage(1);
      setHasMore(initialData.length > 0);
      isInitialMount.current = true;
      isFetchingRef.current = false;
    } else {
      // Nếu chỉ initialData thay đổi
      setDataList(initialData);
      setHasMore(initialData.length > 0);
    }
  }, [query, initialData]);

  const fetchMore = useCallback(async () => {
    if (isFetchingRef.current || !hasMore) return;
    
    if (isInitialMount.current && initialData.length === 0) {
      setHasMore(false);
      return;
    }
    
    isFetchingRef.current = true;
    isInitialMount.current = false;

    try {
      const newData = await fetchData(page + 1, currentQuery.current);

      if (!newData || newData.length === 0) {
        setHasMore(false);
        return;
      }
      setDataList(prev => {
        const existingIds = new Set(prev.map(item => item.id));
        const uniqueNewData = newData.filter(item => !existingIds.has(item.id));
        return [...prev, ...uniqueNewData];
      });

      setPage(prev => prev + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
      setHasMore(false);
    } finally {
      isFetchingRef.current = false;
    }
  }, [page, hasMore, fetchData, initialData]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        hasMore &&
        !isFetchingRef.current &&
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - threshold
      ) {
        fetchMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, fetchMore, threshold]);

  return {
    dataList,
    page,
    hasMore,
    fetchMore,
    isLoading: isFetchingRef.current
  };
}