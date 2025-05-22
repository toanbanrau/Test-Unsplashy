"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IUnplash } from "@/interfaces/unplash";
import SearchInput from "./Home/SeacrhInput";
import ImageCard from "./Home/ImageCard";
import ImageModal from "./Home/ImageModal";
import "../assets/styles/imagegallery.css";
import { useIsMobile } from "@/hook/useMobile";

interface ImageGalleryProps {
  photos: IUnplash[];
  query: string;
}

export default function ImageGallery({ photos, query }: ImageGalleryProps) {
  const router = useRouter();
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  const isMobile = useIsMobile();

  const handleImageClick = (imageId: string) => {
    if (isMobile) {
      router.push(`/photos/${imageId}`);
      return;
    }
    setSelectedImageId(imageId);
  };

  const handleSearch = (searchQuery: string) => {
    router.push(`search/?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      {query && <SearchInput initialQuery={query} onSearch={handleSearch} />}
      {photos.length === 0 ? (
        <div className="no-photo-message">
          Không có ảnh nào phù hợp với từ khóa.
        </div>
      ) : (
        <>
          <ImageCard
            initialPhotos={photos}
            query={query}
            onImageClick={handleImageClick}
          />
          <ImageModal
            imageId={selectedImageId}
            onClose={() => setSelectedImageId(null)}
          />
        </>
      )}
    </>
  );
}
