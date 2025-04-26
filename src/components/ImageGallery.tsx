"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getPhoto } from "@/services/unplashService";
import "../assets/styles/imagegallery.css";
import { IUnplash } from "@/interfaces/unplash";

interface ImageGalleryProps {
  photos: IUnplash[];
  query: string;
  page: number;
}

export default function ImageGallery({
  photos,
  query,
  page,
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<IUnplash[] | null>(null);
  const [selectedImageData, setSelectedImageData] = useState<IUnplash[] | null>(
    null
  );
  const router = useRouter();

  const handleImageClick = async (imageId: string) => {
    setSelectedImage(null);
    setSelectedImageData(null);

    const res = await getPhoto(imageId);
    const imageData = res;

    setSelectedImage(imageData.urls.regular);
    setSelectedImageData(imageData);

    window.history.pushState({}, "", `/photos/${imageId}`);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedImageData(null);
    router.replace("/", { scroll: false });
  };

  return (
    <div className="gallery-container">
      <div className="gallery-grid">
        {photos.map((image:IUnplash) => (
          <div
            key={image.id}
            className="gallery-item"
            onClick={() => handleImageClick(image.id)}
          >
            <img
              src={image.urls.small}
              alt={image.alt_description || "Unsplash Image"}
              className="gallery-image"
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <button className="modal-close-button" onClick={closeModal}>
                ✕
              </button>
              <div className="modal-info">
                <span className="modal-photographer">
                  {selectedImageData?.user.name || "Photographer"}
                </span>
              </div>
              <div className="modal-actions">
                <button className="modal-action-button">♥</button>
                <button className="modal-action-button">+</button>
                <button className="modal-action-button modal-download">
                  Télécharger
                </button>
              </div>
            </div>
            <div className="modal-image-container">
              <img
                src={selectedImage}
                alt={selectedImageData?.alt_description || "Image"}
                className="modal-image"
              />
            </div>
            <p className="modal-text">
              Photo by <strong>{selectedImageData?.user.name}</strong> on{" "}
              <a
                href={selectedImageData?.links.html}
                target="_blank"
                className="modal-link"
              >
                Unsplash
              </a>
            </p>
          </div>
        </div>
      )}

      <div className="pagination">
        {page > 1 && (
          <a href={`/?query=${query}&page=${page - 1}`}>
            <button className="pagination-button">Previous</button>
          </a>
        )}
        <a href={`/?query=${query}&page=${page + 1}`}>
          <button className="pagination-button">Next</button>
        </a>
      </div>
    </div>
  );
}
