import { useSearchParams } from "next/navigation";

export default function useMovieQueryParams() {
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search") || "";
  const selectedGenre = searchParams.get("genre") || "";
  const selectedLanguage = searchParams.get("language") || "";
  const selectedAvailable = searchParams.get("available") || "";

  return { searchQuery, selectedGenre, selectedLanguage, selectedAvailable };
}