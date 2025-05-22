import { useEffect, useRef, useState } from "react";
import { IUnplash } from "@/interfaces/unplash";


export const useInfiniteScroll = (
  initialPhotos: IUnplash[],
  query: string
) => {
  const [imageList, setImageList] = useState<IUnplash[]>(initialPhotos);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const isFetchingRef = useRef<boolean>(false);

  useEffect(() => {
    setImageList(initialPhotos);
    setPage(1);
    setHasMore(true);
  }, [query, initialPhotos]);

  const fetchMorePhotos = async () => {
    if (isFetchingRef.current || !hasMore) return;
    isFetchingRef.current = true;

    try {
      const newPhotos = await fetchPhotos(page + 1, query);
      if (newPhotos.length === 0) {
        setHasMore(false);
        return;
      }

      setImageList((prev) => [...prev, ...newPhotos]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        hasMore &&
        !isFetchingRef.current
      ) {
        fetchMorePhotos();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, page, query]);

  return {
    imageList,
    fetchMorePhotos,
    containerRef: useRef<HTMLDivElement>(null),
  };
};
function fetchPhotos(arg0: number, query: string) {
  throw new Error("Function not implemented.");
}

