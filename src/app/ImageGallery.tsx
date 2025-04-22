"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ImageGallery({
  photos,
  query,
  page,
}: {
  photos: any[];
  query: string;
  page: number;
}) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageData, setSelectedImageData] = useState<any | null>(null);
  const router = useRouter();

  const handleImageClick = async (imageId: string) => {
    setSelectedImage(null);
    setSelectedImageData(null);

    const res = await fetch(
      `https://api.unsplash.com/photos/${imageId}?client_id=RNK_QDDJzZm_9BIFw04b0swgRydz3pyJNFp45UxG0zE`
    );
    const imageData = await res.json();

    setSelectedImage(imageData.urls.regular);
    setSelectedImageData(imageData);

    window.history.pushState({}, "", `/photos/${imageId}`);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedImageData(null);
    router.replace("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>
        {query ? `Results for "${query}"` : "Popular Photos"} (Page {page})
      </h1>

      <div className="photo-grid">
        {photos.map((image) => (
          <img
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description || "Unsplash Image"}
            style={{ cursor: "pointer", margin: "10px" }}
            onClick={() => handleImageClick(image.id)}
          />
        ))}
      </div>

      {selectedImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
          onClick={closeModal}
        >
          <div
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              position: "relative",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt={selectedImageData?.alt_description || "Image"}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <p style={{ color: "white", marginTop: "10px" }}>
              Photo by <strong>{selectedImageData?.user.name}</strong> on{" "}
              <a
                href={selectedImageData?.links.html}
                target="_blank"
                style={{ color: "lightblue" }}
              >
                Unsplash
              </a>
            </p>
          </div>
        </div>
      )}

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        {page > 1 && (
          <a href={`/?query=${query}&page=${page - 1}`}>
            <button style={{ marginRight: "10px", padding: "10px 20px" }}>
              Previous
            </button>
          </a>
        )}
        <a href={`/?query=${query}&page=${page + 1}`}>
          <button style={{ padding: "10px 20px" }}>Next</button>
        </a>
      </div>
    </div>
  );
}
