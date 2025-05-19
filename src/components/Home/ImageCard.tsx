"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getPhotos, searchPhotos } from "@/services/unplashService";
import { IUnplash } from "@/interfaces/unplash";

interface PhotoGridProps {
  initialPhotos: IUnplash[];
  query: string;
  onImageClick: (imageId: string) => void;
}

export default function PhotoGrid({
  initialPhotos,
  query,
  onImageClick,
}: PhotoGridProps) {
  const [imageList, setImageList] = useState<IUnplash[]>(initialPhotos);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const isFetchingRef = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setImageList(initialPhotos);
    setPage(1);
    setHasMore(true);
  }, [query, initialPhotos]);

  const fetchMorePhotos = async () => {
    if (isFetchingRef.current || !hasMore) return;
    isFetchingRef.current = true;

    try {
      const newPhotos = query
        ? await searchPhotos(query, page + 1)
        : await getPhotos(page + 1);

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

  const resizeAllGridItems = () => {
    if (!containerRef.current) return;

    const rowHeight = 10;

    const containerWidth = containerRef.current.clientWidth;
    const computedStyle = getComputedStyle(containerRef.current);
    const gap = parseInt(computedStyle.gap || "0");
    const columnCount = Math.floor(
      containerWidth / (250 + parseInt(computedStyle.gap || "0")) // 250px là minmax width của cột trong css
    );

    const items = containerRef.current.querySelectorAll(".gallery-item");

    items.forEach((item, index) => {
      const image = imageList[index];
      if (!image) return;

      const columnWidth = containerWidth / columnCount;

      const height = (image.height / image.width) * columnWidth;

      const span = Math.ceil((height + gap) / (rowHeight + gap));
      (item as HTMLElement).style.gridRowEnd = `span ${span}`;
    });
  };

  useEffect(() => {
    resizeAllGridItems();
    window.addEventListener("resize", resizeAllGridItems);
    return () => window.removeEventListener("resize", resizeAllGridItems);
  }, [imageList]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        hasMore &&
        !isFetchingRef.current
      ) {
        fetchMorePhotos();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, page, query]);

  return (
    <div ref={containerRef} className="gallery-container">
      {imageList.map((image: IUnplash) => (
        <div
          key={image.id}
          className="gallery-item"
          onClick={() => onImageClick(image.id)}
        >
          <Image
            loading="lazy"
            src={image.urls.small}
            alt={image.alt_description || "Unsplash Image"}
            width={image.width}
            height={image.height}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      ))}
    </div>
  );
}
