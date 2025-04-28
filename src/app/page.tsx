import { getPhotos, searchPhotos } from "@/services/unplashService";
import ImageGallery from "../components/ImageGallery";
import Banner from "@/components/Banner";

// Correctly define the type for `searchParams`
interface PageProps {
  searchParams: Record<string, string | undefined>;
}

export default async function Home({ searchParams }: PageProps) {
  const page = parseInt(searchParams.page || "1", 10);
  const query = searchParams.query || "";
  const isSearching = query.trim().length > 0;

  let photos;

  try {
    if (isSearching) {
      photos = await searchPhotos(query, page);
    } else {
      photos = await getPhotos(page);
    }
  } catch (error) {
    console.error("Error fetching photos:", error);
    return <div>Error fetching photos. Please try again later.</div>;
  }

  return (
    <div>
      <Banner />
      <ImageGallery photos={photos} query={query} page={page} />
    </div>
  );
}
