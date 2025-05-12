import { Movie } from "@/interface/movie";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

interface LanguageFilterProps {
  data: Movie[];
}

export default function LanguageFilter({ data }: LanguageFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedLanguage = searchParams.get("language") || "";

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("language", e.target.value);
    router.replace(`?${params.toString()}`);
  };

  const uniqueLanguages = useMemo(() => {
    return [...new Set(data.flatMap((movie) => movie.languages))];
  }, [data]);

  return (
    <div className="filter">
      <label htmlFor="language">Language</label>
      <select
        id="language"
        value={selectedLanguage}
        onChange={handleLanguageChange}
      >
        <option value="">All</option>
        {uniqueLanguages.map((language, index) => (
          <option key={index} value={language}>
            {language}
          </option>
        ))}
      </select>
    </div>
  );
}
