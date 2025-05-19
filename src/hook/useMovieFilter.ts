import { useMemo } from "react";
import { Movie } from "@/interface/movie";

interface UseFilteredMoviesProps {
  data: Movie[];
  searchQuery: string;
  selectedGenre: string;
  selectedLanguage: string;
  selectedAvailable: string;
}



export default function useFilteredMovies({
  data,
  searchQuery,
  selectedGenre,
  selectedLanguage,
  selectedAvailable,
}: UseFilteredMoviesProps) {
  return useMemo(() => {

    return data.filter((movie) => {
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre ? movie.genre === selectedGenre : true;
      const matchesLanguage = selectedLanguage
        ? movie.languages.includes(selectedLanguage)
        : true;
      const matchesPlatform = selectedAvailable
        ? movie.availableOn.includes(selectedAvailable)
        : true;
      return (
        matchesSearch && matchesGenre && matchesLanguage && matchesPlatform
      );
    });
  }, [data, searchQuery, selectedGenre, selectedLanguage, selectedAvailable]);
}