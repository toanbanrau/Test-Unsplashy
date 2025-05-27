"use client";

import ImageGallery from "@/components/ImageGallery";
import React, { useEffect } from "react";
import { getPhotos } from "@/services/unplashService";
import { IUnplash } from "@/interfaces/unplash";
import "../../assets/styles/searchpage.css";
import SearchInput from "@/components/SeacrhInput";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchPhoto() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [images, setImages] = React.useState<IUnplash[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    const fetchInitialImages = async () => {
      if (!query.trim()) {
        setImages([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = await getPhotos(1, query);
        setImages(data);
      } catch (error) {
        console.error("Failed to fetch photos:", error);
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialImages();
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!searchQuery) {
      params.delete("query");
      router.push(`/search?${params.toString()}`);
      return;
    }

    params.set("query", searchQuery);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="search-container">
      <SearchInput initialQuery={query} onSearch={handleSearch} />

      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : images.length === 0 && query ? (
        <div className="no-results">No images found for "{query}"</div>
      ) : (
        <ImageGallery images={images} query={query} />
      )}
    </div>
  );
}
