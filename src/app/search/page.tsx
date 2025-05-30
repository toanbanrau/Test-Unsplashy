"use client";

import ImageGallery from "@/components/ImageGallery";
import React, { useEffect } from "react";
import { getPhotos } from "@/services/unplashService";
import { IUnplash } from "@/interfaces/unplash";
import "../../assets/styles/searchpage.css";
import SearchInput from "@/components/SeacrhInput";
import { useSearchParams } from "next/navigation";

export default function SearchPhoto() {
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

  return (
    <div className="search-container">
      <div className="search-label-wrapper">
        <label className="search-label" htmlFor="search">
          Search
        </label>
        <SearchInput
          debounceOnChange={true}
          initialValue={query}
          variant="searchPage"
        />
      </div>
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
