"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPhoto } from "@/services/unplashService";
import { IUnplash } from "@/interfaces/unplash";

interface PhotoModalProps {
  imageId: string | null;
  onClose: () => void;
}

export default function PhotoModal({ imageId, onClose }: PhotoModalProps) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageData, setSelectedImageData] = useState<IUnplash | null>(
    null
  );

  useEffect(() => {
    if (!imageId) return;

    const fetchImage = async () => {
      setSelectedImage(null);
      setSelectedImageData(null);

      const res = await getPhoto(imageId);
      const imageData = res;

      setSelectedImage(imageData.urls.regular);
      setSelectedImageData(imageData);

      window.history.pushState({}, "", `/photos/${imageId}`);
    };

    fetchImage();
  }, [imageId]);

  const handleClose = () => {
    setSelectedImage(null);
    setSelectedImageData(null);
    router.back();
    onClose();
  };

  if (!selectedImage || !selectedImageData) return null;

  return (
    <div className="modal" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="modal-close-button" onClick={handleClose}>
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
          Photo by
          <strong>{selectedImageData?.user.name || "Photographer"} </strong>
          <a
            href={selectedImageData?.user?.links.html}
            target="_blank"
            className="modal-link"
          >
            Unsplash
          </a>
        </p>
      </div>
    </div>
  );
}
