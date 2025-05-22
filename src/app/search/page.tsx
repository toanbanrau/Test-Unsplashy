import ImageGallery from "@/components/ImageGallery";
import React from "react";
import { getPhotos } from "@/services/unplashService";
import { IUnplash } from "@/interfaces/unplash";
import "../../assets/styles/searchpage.css";

interface PageProps {
  searchParams: Record<string, string | undefined>;
}

const SearchPhoto = async ({ searchParams }: PageProps) => {
  const page = 1;
  const query = searchParams.query || "";

  let photos: IUnplash[] = [];

  if (query.trim()) {
    try {
      photos = await getPhotos(page, query);
    } catch (error) {
      console.error("Failed to fetch photos:", error);
    }
  }

  return (
    <div className="search-container">
      <ImageGallery photos={photos} query={query} />
    </div>
  );
};

export default SearchPhoto;
