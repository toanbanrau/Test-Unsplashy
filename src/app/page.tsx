"use client";
import { data } from "@/data/datamock";
import MovieCard from "./components/MovieCart";
import { useMemo, useState } from "react";

export default function Home() {
 
  const [searchQuery, setSeacrhQuery] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [selectedAvaible, setSelectedAvaible] = useState<string>("");

  const filteredData = useMemo(() => {
    return data.filter((movie) => {
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre ? movie.genre === selectedGenre : true;
      const matchesLanguage = selectedLanguage
        ? movie.languages.includes(selectedLanguage)
        : true;
      const matchesPlatform = selectedAvaible
        ? movie.availableOn.includes(selectedAvaible)
        : true;
      return (
        matchesGenre && matchesLanguage && matchesPlatform && matchesSearch
      );
    });
  }, [searchQuery, selectedGenre, selectedLanguage, selectedAvaible]);

  return (
    <div>
      <h1>Movie List</h1>
      <label htmlFor="">Search</label>
      <input type="text" onChange={(e) => setSeacrhQuery(e.target.value)} />

      <label htmlFor="">Thể Loại</label>
      <select onChange={(e) => setSelectedGenre(e.target.value)} name="" id="">
        <option value="">All</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Thriller">Thriller</option>
        <option value="Crime">Crime </option>
      </select>
      <label htmlFor="">Language</label>
      <select
        onChange={(e) => setSelectedLanguage(e.target.value)}
        name=""
        id=""
      >
        <option value="">All</option>
        <option value="English">English</option>
        <option value="Italian">Italian</option>
        <option value="Latin">Latin </option>
        <option value="Korean">Korean </option>
        <option value="Japanese">Japanese </option>
        <option value="French">French </option>
      </select>
      <label htmlFor="">Avaible</label>
      <select
        onChange={(e) => setSelectedAvaible(e.target.value)}
        name=""
        id=""
      >
        <option value="">All</option>
        <option value="Hulu">Hulu</option>
        <option value="Amazon Prime">Amazon Prime</option>
        <option value="Netflix">Netflix </option>
        <option value="HBO Max">HBO Max </option>
        <option value="Paramount">Paramount </option>
        <option value="Apple TV">Apple TV </option>
      </select>
      <div className="movie-list">
        {filteredData.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
}
