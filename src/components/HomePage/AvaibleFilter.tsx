import { Movie } from "@/interface/movie";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

interface AvailableFilterProps {
  data: Movie[];
}

export default function AvailableFilter({ data }: AvailableFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedAvailable = searchParams.get("available") || "";

  const uniquePlatforms = useMemo(() => {
    return [...new Set(data.flatMap((movie) => movie.availableOn))];
  }, [data]);

  const handleAvailableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("available", e.target.value);
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="filter">
      <label htmlFor="available">Available On</label>
      <select
        id="available"
        value={selectedAvailable}
        onChange={handleAvailableChange}
      >
        <option value="">All</option>
        {uniquePlatforms.map((platform, index) => (
          <option key={index} value={platform}>
            {platform}
          </option>
        ))}
      </select>
    </div>
  );
}
