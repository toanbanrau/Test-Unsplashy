import { getPhotos, searchPhotos } from "@/services/unplashService";
import ImageGallery from "../components/ImageGallery";
import Banner from "@/components/Banner";

interface PageProps {
  searchParams: Record<string, string | undefined>;
}

export default async function Home({ searchParams }: PageProps) {
  const page = 1;
  const query = searchParams.query || "";
  const isSearching = query.trim().length > 0;

  let photos;

  try {
    // early return
    if (isSearching) {
      photos = await searchPhotos(query, page);
    } else {
      photos = await getPhotos(page);
    }
  } catch (error) {
    console.error("Error fetching photos:", error);
    return alert("Error");
  }

  return (
    <div className="main-image">
      {isSearching ? "" : <Banner />}
      <ImageGallery photos={photos} query={query} />
    </div>
  );
}
