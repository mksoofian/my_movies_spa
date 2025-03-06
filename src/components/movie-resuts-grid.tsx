import { Movie } from "../types/movie_types";
import { errorCard } from "../utils/movie-card-sample-data";
import MovieCard from "./movie-card";

export default function MovieResultsGrid({
  results,
}: {
  results: (Movie | undefined)[];
}) {
  return (
    <div className="grid">
      {results.map((movie) => {
        return (
          <MovieCard
            key={movie?.id}
            movie={movie === undefined ? errorCard : movie}
          />
        );
      })}
    </div>
  );
}
