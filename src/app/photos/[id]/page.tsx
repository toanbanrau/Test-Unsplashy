// app/photo/[id]/page.tsx

import React from "react";

export default async function PhotoDetail({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(
    `https://api.unsplash.com/photos/${params.id}?client_id=RNK_QDDJzZm_9BIFw04b0swgRydz3pyJNFp45UxG0zE`
  );

  if (!res.ok) {
    return <div>Không tìm thấy ảnh!</div>; // hoặc dùng notFound()
  }

  const data = await res.json();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 sm:p-6">
      {/* Header Actions */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Unsplashy</h1>
        <div className="flex space-x-3">
          <button className="p-2 rounded-full bg-white shadow-md hover:bg-gray-200 transition duration-300">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </button>
          <button className="p-2 rounded-full bg-white shadow-md hover:bg-gray-200 transition duration-300">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.684 13.342C9.886 12.938 10.5 12.042 10.5 11c0-1.657-1.343-3-3-3S4.5 9.343 4.5 11c0 1.042.614 1.938 1.816 2.342M15 18h3m-3-3h6m-9-9h.01M12 18l-6-6m6 6l6-6"
              ></path>
            </svg>
          </button>
          <a
            href={data.urls.full}
            download
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-200 transition duration-300"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              ></path>
            </svg>
          </a>
        </div>
      </div>

      {/* Main Image */}
      <div className="w-full max-w-3xl">
        <img
          src={data.urls.regular}
          alt={data.alt_description || "Ảnh từ Unsplash"}
          className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        />
      </div>

      {/* Photo Info */}
      <div className="w-full max-w-3xl mt-6 text-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Ảnh bởi <span className="font-bold">{data.user.name}</span>
        </h2>
        <p className="mt-2">
          <a
            href={data.links.html}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Xem trên Unsplash
          </a>
        </p>
      </div>

      {/* Footer Actions */}
      <div className="w-full max-w-3xl flex justify-end space-x-3 mt-6">
        <button className="text-gray-600 hover:text-gray-800 transition">
          TẢI LÊN
        </button>
        <button className="text-gray-600 hover:text-gray-800 transition">
          TÉLÉCHARGEMENTS
        </button>
        <button className="text-gray-600 hover:text-gray-800 transition">
          ↪ Partager
        </button>
        <button className="text-gray-600 hover:text-gray-800 transition">
          ℹ Infos
        </button>
        <button className="text-gray-600 hover:text-gray-800 transition">
          ...
        </button>
      </div>
    </div>
  );
}
