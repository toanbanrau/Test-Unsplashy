"use client";

import { useRouter } from "next/navigation";
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
  const router = useRouter();

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
    setSelectedImage(null); // Clear cũ nếu có
    setSelectedImageData(null);

    const res = await fetch(
      `https://api.unsplash.com/photos/${imageId}?client_id=RNK_QDDJzZm_9BIFw04b0swgRydz3pyJNFp45UxG0zE`
    );
    const imageData = await res.json();

    setSelectedImage(imageData.urls.regular);
    setSelectedImageData(imageData);

    window.history.pushState({}, "", `/photos/${imageId}`); // đổi URL nhưng không reload
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedImageData(null);
    router.replace("/");
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
            backgroundColor: "rgba(0, 0, 0, 0.8)", // Nền tối với độ mờ
            backdropFilter: "blur(5px)", // Hiệu ứng mờ nền
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            zIndex: 999,
            overflowY: "auto",
            transition: "background-color 0.3s ease", // Hiệu ứng chuyển đổi khi hover
            cursor: "pointer", // Con trỏ kiểu nhấp được trên nền
          }}
          onClick={closeModal}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.9)")
          } // Tăng độ tối khi hover
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.8)")
          } // Trả lại độ tối ban đầu
        >
          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              width: "100%",
              backgroundColor: "#fff", // Nền trắng cho nội dung
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)", // Bóng để nổi bật
              padding: "20px",
              position: "relative", // Để định vị nút đóng
              border: "2px solid #ddd", // Viền ngoài để làm rõ khu vực nội dung
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Nút đóng */}
            <button
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                color: "#666",
              }}
              onClick={closeModal}
            >
              <i className="fas fa-times"></i> {/* Biểu tượng "X" */}
            </button>

            {/* Header với logo, slogan và các nút */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="https://via.placeholder.com/30" // Thay bằng logo SumUp thực tế
                  alt="SumUp Logo"
                  style={{ width: "30px", height: "30px", marginRight: "10px" }}
                />
                <div>
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                    SumUp
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#666",
                      marginLeft: "5px",
                    }}
                  >
                    A better way to get paid
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  style={{
                    background: "none",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "8px 12px",
                    cursor: "pointer",
                  }}
                >
                  <i className="fas fa-heart"></i> {/* Yêu thích */}
                </button>
                <button
                  style={{
                    background: "none",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "8px 12px",
                    cursor: "pointer",
                  }}
                >
                  <i className="fas fa-plus"></i> {/* Thêm vào bộ sưu tập */}
                </button>
                <button
                  style={{
                    background: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "8px 12px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    window.open(selectedImageData?.links.download, "_blank")
                  } // Tải xuống ảnh
                >
                  Télécharger
                </button>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    padding: "8px 12px",
                    cursor: "pointer",
                  }}
                >
                  <i className="fas fa-share-alt"></i> {/* Chia sẻ */}
                </button>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    padding: "8px 12px",
                    cursor: "pointer",
                  }}
                >
                  <i className="fas fa-info-circle"></i> {/* Thông tin */}
                </button>
              </div>
            </div>

            {/* Ảnh lớn */}
            <div style={{ textAlign: "center" }}>
              <img
                src={selectedImage}
                alt={selectedImageData?.alt_description || "Image"}
                style={{
                  width: "100%",
                  maxHeight: "70vh",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
            </div>

            {/* Số liệu */}
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                gap: "20px",
                fontSize: "14px",
                color: "#666",
              }}
            >
              <span>
                Vues {selectedImageData?.views?.toLocaleString() || "328.851"}
              </span>
              <span>
                Téléchargements{" "}
                {selectedImageData?.downloads?.toLocaleString() || "2.670"}
              </span>
            </div>

            {/* Tín dụng tác giả */}
            <p
              style={{ color: "#333", marginTop: "10px", textAlign: "center" }}
            >
              Photo by <strong>{selectedImageData?.user.name}</strong> on{" "}
              <a
                href={selectedImageData?.links.html}
                target="_blank"
                style={{ color: "#007bff" }}
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
