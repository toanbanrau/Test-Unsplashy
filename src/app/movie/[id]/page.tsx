"use client";
import FavoriteButton from "@/components/PageDetail/FavoriteButton";
import MovieInfor from "@/components/PageDetail/MovieInfor";
import ReviewList from "@/components/PageDetail/ReviewList";
import { data } from "@/data/datamock";
import { Movie } from "@/interface/movie";
import { useMemo } from "react";
import "../../../assets/styles/MovieDetail.css";

interface MovieDetailProps {
  params: { id: string };
}

export default function MovieDetail({ params }: MovieDetailProps) {
  const movieId = Number(params.id);
  const movie: Movie | undefined = useMemo(() => {
    return data.find((movie) => movie.id === movieId);
  }, [movieId]);

  if (!movie) {
    return alert("Movie not found!");
  }
  return (
    <div>
      <div className="movie-detail-container">
        <MovieInfor movie={movie} />
        <FavoriteButton movieId={movieId} />
      </div>
      <div className="review-section">
        <ReviewList initialReview={movie.reviews} />
      </div>
    </div>
  );
}
