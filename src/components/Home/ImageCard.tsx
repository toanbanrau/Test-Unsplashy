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

export default function PhotoGrid({ initialPhotos, query, onImageClick }: PhotoGridProps) {
  const [imageList, setImageList] = useState<IUnplash[]>(initialPhotos);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    setImageList(initialPhotos);
    setPage(1);
    setHasMore(true);
  }, [initialPhotos, query]);

  const fetchMorePhotos = async () => {
    if (isFetchingRef.current || !hasMore) return;
    isFetchingRef.current = true;

    try {
      const newPhotos = query
        ? await searchPhotos(query, page + 1)
        : await getPhotos(page + 1);

      if (newPhotos.length === 0) {
        setHasMore(false);
      } else {
        setImageList((prev) => [...prev, ...newPhotos]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetchingRef.current) {
          fetchMorePhotos();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore]);

  return (
    <div className="gallery-container">
      <div className="gallery-grid">
        {imageList.map((image) => (
          <div
            key={image.id}
            className="gallery-item"
            onClick={() => onImageClick(image.id)}
          >
            <Image
              loading="lazy"
              width={300}
              height={400}
              src={image.urls.small}
              alt={image.alt_description || "Unsplash Image"}
              className="gallery-image"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/2wBDAAoHBwkHBgoJCAkLCwoMDxkQDw4ODx4WFxIZJCAmJSMgIyIOJj4kLC0tMjIyPCsyPTIyPCsyPTIyPCsyPTIyP//AABEIAAUAGAMBIgACEQEDEQH/xAAYAAACAwAAAAAAAAAAAAAAAAAAAQUGB//EAAQAAICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg"
            />
          </div>
        ))}
      </div>
      <div ref={observerRef} style={{ height: "1px" }} />
    </div>
  );
}