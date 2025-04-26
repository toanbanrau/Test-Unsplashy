import { getPhoto } from "@/services/unplashService";

import React from "react";
import "../../../assets/styles/imagedetail.css";

export default async function PhotoDetail({
  params,
}: {
  params: { id: string };
}) {
  const res = await getPhoto(params.id);
  const data = res;

  return (
    <div className="unsplash-detail">
      <div className="unsplash-container">
        <div className="unsplash-main">
          <div className="unsplash-author">
            <img src={data.user.profile_image.medium} alt={data.user.name} />
            <div className="author-info">
              <p>{data.user.name}</p>
              <a
                href={`https://unsplash.com/@${data.user.username}`}
                target="_blank"
                rel="noreferrer"
              >
                @{data.user.username}
              </a>
            </div>
            <button className="follow-btn">Follow</button>
          </div>

          <div className="unsplash-image">
            <img
              src={data.urls.regular}
              alt={data.alt_description || "Ảnh từ Unsplash"}
            />
          </div>

          <div className="unsplash-description">
            {data.description && <p className="caption">{data.description}</p>}
            <a href={data.links.html} target="_blank" rel="noreferrer">
              Xem trên Unsplash
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
