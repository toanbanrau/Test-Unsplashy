"use client";

import { useEffect, useState } from "react";
import useDebounce from "@/hook/useDebounce";

interface SearchInputProps {
  initialQuery: string;
  onSearch: (query: string) => void;
}

export default function SearchInput({ initialQuery, onSearch }: SearchInputProps) {
  const [searchValue, setSearchValue] = useState(initialQuery);
  const debouncedSearchValue = useDebounce(searchValue, 300);

  useEffect(() => {
    if (debouncedSearchValue && debouncedSearchValue !== initialQuery) {
      onSearch(debouncedSearchValue);
    }
  }, [debouncedSearchValue, initialQuery, onSearch]);

  return (
    <div className="search-input">
      <label htmlFor="search">Search</label>
      <input
        id="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        type="text"
        placeholder="Search photos..."
      />
    </div>
  );
}