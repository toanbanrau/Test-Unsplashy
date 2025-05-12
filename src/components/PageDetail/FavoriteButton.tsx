import React, { useCallback, useEffect, useState } from "react";

const FavoriteButton = ({ movieId }: { movieId: number }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(
      localStorage.getItem("favoriteMovies") || "[]"
    );
    setIsFavorite(favorites.includes(movieId));
  }, [movieId]);

  const toggleFavorite = useCallback(() => {
    const favorites = JSON.parse(
      localStorage.getItem("favoriteMovies") || "[]"
    );

    let updatedFavorites;
    if (favorites.includes(movieId)) {
      updatedFavorites = favorites.filter((id: number) => id !== movieId);
      localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
      return;
    }
    updatedFavorites = [...favorites, movieId];
    setIsFavorite(!isFavorite);
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
  }, [movieId, isFavorite]);
  return (
    <button onClick={toggleFavorite}>
      {isFavorite ? "💖 Loved It" : "🤍 Favourite"}
    </button>
  );
};
export default FavoriteButton;
