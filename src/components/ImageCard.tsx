import { IUnplash } from "@/interfaces/unplash";
import React from "react";

interface ImageCardProps {
  image: IUnplash;
  onClick: (id: string) => void;
}

const ImageCard = ({ image, onClick }: ImageCardProps) => {
  return (
    <div className="gallery-item" onClick={() => onClick(image.id)}>
      <img
        src={image.urls.small}
        alt={image.alt_description || "Unsplash Image"}
        className="gallery-image"
      />
    </div>
  );
};

export default React.memo(ImageCard);
