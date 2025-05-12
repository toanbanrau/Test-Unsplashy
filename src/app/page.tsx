"use client";

import { data } from "@/data/datamock";
import SeacrhInput from "@/components/HomePage/SeacrhInput";
import GenreFilter from "@/components/HomePage/GenreFillter";
import LanguageFilter from "@/components/HomePage/LanguageFilter";
import AvailableFilter from "@/components/HomePage/AvaibleFilter";
import "../assets/styles/Home.css";
import MovieList from "@/components/HomePage/MovieList";
import useFilteredMovies from "@/hook/useFilter";
import useQueryParams from "@/hook/useQueryParams";

export default function Home() {
  
 const { searchQuery, selectedGenre, selectedLanguage, selectedAvailable } =
    useQueryParams();

  const filteredData = useFilteredMovies({
    data,
    searchQuery,
    selectedGenre,
    selectedLanguage,
    selectedAvailable,
  });

  return (
    <div className="home-container">
      <h1 className="title-home">Movie List</h1>
      <SeacrhInput />
      <GenreFilter data={data} />
      <LanguageFilter data={data} />
      <AvailableFilter data={data} />
      <MovieList movies={filteredData} />
    </div>
  );
}
