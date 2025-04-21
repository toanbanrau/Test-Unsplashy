"use client";

import { useState, useEffect } from "react";

export default function Home({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const [photos, setPhotos] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageData, setSelectedImageData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const page = parseInt(searchParams.page || "1");
  const query = searchParams.query || "";
  const perPage = 30;

  const isSearching = query.trim().length > 0;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = isSearching
          ? `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=${perPage}&client_id=RNK_QDDJzZm_9BIFw04b0swgRydz3pyJNFp45UxG0zE`
          : `https://api.unsplash.com/photos?page=${page}&per_page=${perPage}&client_id=RNK_QDDJzZm_9BIFw04b0swgRydz3pyJNFp45UxG0zE`;

        const res = await fetch(url, { cache: "no-store" });
        const data = await res.json();
        setPhotos(isSearching ? data.results : data);
      } catch (err) {
        setError("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page, isSearching]);

  const handleImageClick = async (imageId: string) => {
    const res = await fetch(
      `https://api.unsplash.com/photos/${imageId}?client_id=RNK_QDDJzZm_9BIFw04b0swgRydz3pyJNFp45UxG0zE`
    );
    const imageData = await res.json();
    setSelectedImage(imageData.urls.regular);
    setSelectedImageData(imageData);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedImageData(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>
        {isSearching ? `Résultats pour "${query}"` : `Photos populaires`} (Page{" "}
        {page})
      </h1>

      <div className="photo-grid">
        {photos.map((image: any) => (
          <img
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description || "Unsplash Image"}
            style={{ cursor: "pointer", margin: "10px" }}
            onClick={() => handleImageClick(image.id)} // Khi click vào ảnh
          />
        ))}
      </div>

      {/* Modal */}
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
          onClick={closeModal} // Đóng khi click vào overlay
        >
          <div
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              position: "relative",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()} // Ngừng sự kiện click khi click vào ảnh
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
