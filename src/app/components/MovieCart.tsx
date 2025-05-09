"use client";
import { Movie } from "@/data/datamock";
import React from "react";
import "../globals.css";
import { useRouter } from "next/navigation";

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
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
