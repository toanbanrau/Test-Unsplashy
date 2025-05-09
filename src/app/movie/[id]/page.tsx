"use client";
import { data, Movie } from "@/data/datamock";
import { useCallback, useMemo, useState } from "react";

interface Props {
  params: { id: string };
}

export default function MovieDetail({ params }: Props) {
  const movieId = Number(params.id);
  const movie: Movie | undefined = data.find((m) => m.id === movieId);

  const [reviews, setReviews] = useState(movie?.reviews || []);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [score, setScore] = useState<number>(0);
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(
      localStorage.getItem("favoriteMovies") || "[]"
    );
    return favorites.includes(movieId);
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!name || !comment || score < 0 || score > 10) return;

      const newReview = { user: name, comment, score };
      setReviews((prev) => [...prev, newReview]);

      // Reset form
      setName("");
      setComment("");
      setScore(0);
    },
    [name, comment, score]
  );
  const averageScore = useMemo(() => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.score, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const toggleFavorite = useCallback(() => {
    const favorites = JSON.parse(
      localStorage.getItem("favoriteMovies") || "[]"
    );

    let updatedFavorites;
    if (favorites.includes(movieId)) {
      updatedFavorites = favorites.filter((id: number) => id !== movieId);
      setIsFavorite(!isFavorite);
      return;
    }
    updatedFavorites = [...favorites, movieId];
    setIsFavorite(!isFavorite);
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
  }, [movieId, isFavorite]);

  if (!movie) {
    return alert("Movie not found!");
  }
  return (
    <div>
      <div className="movie-detail-container">
        <h1>{movie.title}</h1>
        <p>{movie.description}</p>
        <p>
          <strong>Genre:</strong> {movie.genre}
        </p>
        <p>
          <strong>Languages:</strong> {movie.languages.join(", ")}
        </p>
        <p>
          <strong>Description:</strong> {movie.description}
        </p>
        <p>
          <strong>Cast:</strong> {movie.cast.join(", ")}
        </p>
        <p>
          <strong>Languages:</strong> {movie.languages.join(", ")}
        </p>
        <p>
          <strong>Available On:</strong> {movie.availableOn.join(", ")}
        </p>
        <p>
          <strong>Awards:</strong> {movie.awards.join(", ")}
        </p>
        <p>
          <strong>Tags:</strong> {movie.tags.join(", ")}
        </p>
        <button onClick={toggleFavorite}>
          {isFavorite ? "💖 Loved It" : "🤍 favourite"}
        </button>
      </div>
      <div className="review-section">
        <h2>Reviews</h2>
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <strong>{review.user}:</strong> {review.comment} -{" "}
              <strong>Score:</strong> {review.score}
            </li>
          ))}
          <p>
            <strong>Average Score:</strong> {averageScore}/10
          </p>
        </ul>

        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Comment</label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <label>Score</label>
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(parseFloat(e.target.value))}
            min={0}
            max={10}
            step={0.1}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
