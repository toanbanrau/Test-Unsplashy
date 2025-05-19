import { Movie } from "@/interface/movie";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface GenreFilterProps {
  data: Movie[]
}

export default function GenreFilter({ data }: GenreFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedGenre = searchParams.get("genre") || "";

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("genre", e.target.value);
    router.replace(`?${params.toString()}`);
  };

   const uniqueGenres = useMemo(() => {
    return [...new Set(data.map((movie) => movie.genre))];
  }, [data]);


  return (
    <div className="filter">
      <label htmlFor="genre">Genre</label>
      <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
        <option value="">All</option>
        {uniqueGenres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
}
