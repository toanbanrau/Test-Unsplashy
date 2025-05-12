"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Movie } from "@/interface/movie";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const route = useRouter();
  return (
    <div
      onClick={() => route.push(`/movie/${movie.id}`)}
      className="movie-card"
    >
      <h2>
        {movie.title} ({movie.year})
      </h2>
      <p>
        <strong>Genre:</strong> {movie.genre}
      </p>
      <p>
        <strong>Director:</strong> {movie.director}
      </p>
      <p>
        <strong>Duration:</strong> {movie.duration} mins
      </p>
    </div>
  );
};

export default MovieCard;
