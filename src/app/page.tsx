// app/page.tsx

import ImageGallery from "./ImageGallery";

const perPage = 30;

export default async function Home({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const page = parseInt(searchParams.page || "1");
  const query = searchParams.query || "";
  const isSearching = query.trim().length > 0;

  const url = isSearching
    ? `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=${perPage}&client_id=RNK_QDDJzZm_9BIFw04b0swgRydz3pyJNFp45UxG0zE`
    : `https://api.unsplash.com/photos?page=${page}&per_page=${perPage}&client_id=RNK_QDDJzZm_9BIFw04b0swgRydz3pyJNFp45UxG0zE`;

  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();
  const photos = isSearching ? data.results : data;

  return <ImageGallery photos={photos} query={query} page={page} />;
}
