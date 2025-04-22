"use client";

export default function ImageGallery({
  photos,
  query,
  page,
}: {
  photos: any[];
  query: string;
  page: number;
}) {
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
