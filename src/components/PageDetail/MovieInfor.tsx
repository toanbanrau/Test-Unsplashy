'use client";';

interface MovieInforProps {
  title: string;
  description: string;
  genre: string;
  languages: string[];
  cast: string[];
  availableOn: string[];
  awards: string[];
  tags: string[];
}

export default function MovieInfor({ movie }: { movie: MovieInforProps }) {
  return (
    <>
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
    </>
  );
}
