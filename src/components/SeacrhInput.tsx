"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
interface SearchInputProps {
  variant?: "header" | "searchPage";
  debounceOnChange?: boolean;
  initialValue?: string;
}

export default function SearchInput({
  debounceOnChange = false,
  initialValue = "",
  variant = "header",
}: SearchInputProps) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(initialValue);
  const debouncedValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debounceOnChange && debouncedValue.trim()) {
      router.replace(`/search?query=${encodeURIComponent(debouncedValue)}`, {
        scroll: false,
      });
    }
  }, [debounceOnChange, debouncedValue, router]);

  const handleClear = () => setSearchValue("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    router.push(`/search?query=${encodeURIComponent(searchValue)}`);
  };
  return (
    <form onSubmit={handleSubmit} className={`search-form-${variant} `}>
      <input
        className={`search-input-${variant}`}
        id="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        type="text"
        placeholder="Search photos..."
      />
      {searchValue && (
        <button type="button" className="clear-button" onClick={handleClear}>
          ✕
        </button>
      )}
    </form>
  );
}
