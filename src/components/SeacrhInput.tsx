"use client";

import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import "../assets/styles/searchinput.css";

interface SearchInputProps {
  initialQuery: string;
  onSearch: (query: string) => void;
}

export default function SearchInput({
  initialQuery,
  onSearch,
}: SearchInputProps) {
  const [searchValue, setSearchValue] = useState(initialQuery);
  const debouncedSearchValue = useDebounce(searchValue, 300);

  useEffect(() => {
    if (debouncedSearchValue && debouncedSearchValue !== initialQuery) {
      onSearch(debouncedSearchValue);
    }
  }, [debouncedSearchValue, initialQuery, onSearch]);

  const handleClear = () => {
    setSearchValue("");
  };

  return (
    <div className="search-input">
      <label htmlFor="search">Search</label>
      <div className="input-container">
        <input
          id="search" 
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="Search photos..."
        />
        {searchValue && (
          <button className="clear-button" onClick={handleClear}>
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
