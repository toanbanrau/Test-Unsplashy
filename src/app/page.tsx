import { getPhotos } from "@/services/unplashService";
import ImageGallery from "../components/ImageGallery";
import Banner from "@/components/Banner";

export default async function Home() {
  const page = 1;
  const images = await getPhotos(page);

  return (
    <div className="main-image">
      <Banner />
      <ImageGallery images={images} />
    </div>
  );
}
