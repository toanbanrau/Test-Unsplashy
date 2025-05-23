"use client";
import { useRef } from "react";
import { IUnplash } from "@/interfaces/unplash";
import ImageCard from "./ImageCard";
import { useInfiniteScroll } from "@/hook/useInfiniteScroll";
import { getPhotos } from "@/services/unplashService";
import "../assets/styles/imagegallery.css";
import { useMasonryLayout } from "@/hook/useMasonryLayout";

interface ImageGalleryProps {
  images: IUnplash[];
  query?: string;
}

export default function ImageGallery({ images: initialPhotos, query = "" }: ImageGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { dataList: imageList } = useInfiniteScroll<IUnplash>({
    initialData: initialPhotos,
    fetchData: getPhotos,
    query,
    threshold: 100
  });

  useMasonryLayout(containerRef, imageList, {
    itemSelector: ".gallery-item",
    rowHeight: 10,
    gapSize: 20,
    columnCounts: {
      default: 4,
      tablet: 2,
      mobile: 1
    }
  });

  return (
    <div ref={containerRef} className="gallery-container">
      {imageList.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
}
