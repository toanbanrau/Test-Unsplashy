"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IUnplash } from "@/interfaces/unplash";
import SearchInput from "./Home/SeacrhInput";
import PhotoGrid from "./Home/ImageCard";
import PhotoModal from "./Home/ImageModal";
import '../assets/styles/imagegallery.css'

interface ImageGalleryProps {
  photos: IUnplash[];
  query: string;
}

export default function ImageGallery({ photos, query }: ImageGalleryProps) {
  const router = useRouter();
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const isMobile = () => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= 768;
  };

  const handleImageClick = (imageId: string) => {
    if (isMobile()) {
      router.push(`/photos/${imageId}`);
      return;
    }
    setSelectedImageId(imageId);
  };

  const handleSearch = (searchQuery: string) => {
    router.push(`/?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div>
      {query && <SearchInput initialQuery={query} onSearch={handleSearch} />}
      <PhotoGrid initialPhotos={photos} query={query} onImageClick={handleImageClick} />
      <PhotoModal imageId={selectedImageId} onClose={() => setSelectedImageId(null)} />
    </div>
  );
}