"use client";

import { useRouter } from "next/navigation";
import { IUnplash } from "@/interfaces/unplash";

interface ImageModalProps {
  image: IUnplash;
  onClose: () => void;
}

export default function ImageModal({ image, onClose }: ImageModalProps) {
  const router = useRouter();

  const handleClose = () => {
    onClose();
    router.back(); 
  };

  if (!image) return null;

  return (
    <div
      className="modal"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="modal-close-button" onClick={handleClose}>
            ✕
          </button>
          <div className="modal-info">
            <span className="modal-photographer">{image.user.name}</span>
          </div>
          <div className="modal-actions">
            <button className="modal-action-button">♥</button>
            <button className="modal-action-button">+</button>
            <button className="modal-action-button modal-download">
              Download
            </button>
          </div>
        </div>
        <div className="modal-image-container">
          <img
            src={image.urls.regular}
            alt={image.alt_description || "Image"}
            className="modal-image"
          />
        </div>
        <p className="modal-text">
          Photo by <strong>{image.user.name}</strong>{" "}
          <a
            href={image.user.links.html}
            target="_blank"
            className="modal-link"
            rel="noopener noreferrer"
          >
            Unsplash
          </a>
        </p>
      </div>
    </div>
  );
}
