import { useState } from "react";
import Image from "next/image";
import { IUnplash } from "@/interfaces/unplash";
import ImageModal from "./ImageModal";
import { useIsMobile } from "@/hook/useMobile";
import { useRouter } from "next/navigation";

interface ImageCardProps {
  image: IUnplash;
}

export default function ImageCard({ image }: ImageCardProps) {
  const [showModal, setShowModal] = useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();

  const handleClick = () => {
    if (isMobile) {
      router.push(`/photos/${image.id}`);
      return;
    }
    setShowModal(true);
    window.history.pushState({}, '', `/photos/${image.id}`);
  };

  return (
    <>
      <div className="gallery-item" onClick={handleClick}>
        <Image
          loading="lazy"
          src={image.urls.small}
          alt={image.alt_description || "Unsplash Image"}
          width={image.width}
          height={image.height}
          className="image-gallery"
        />
      </div>
      {showModal && (
        <ImageModal image={image} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
