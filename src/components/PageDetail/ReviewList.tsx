import { Movie, MovieVeview } from "@/interface/movie";
import React, { useCallback, useMemo, useState } from "react";

interface ReviewListProps {
  initialReview: Pick<Movie, "reviews">;
}

const ReviewList = ({ initialReview }: ReviewListProps) => {
  const [reviews, setReviews] = useState<MovieVeview[]>(initialReview.reviews);
  const averageScore = useMemo(() => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.score, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [score, setScore] = useState<number>(0);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!name || !comment || score < 0 || score > 10) return;

      const newReview = { user: name, comment, score };
      setReviews((prev) => [...prev, newReview]);

      setName("");
      setComment("");
      setScore(0);
    },
    [name, comment, score]
  );

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.comment}>
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
  );
};

export default ReviewList;
