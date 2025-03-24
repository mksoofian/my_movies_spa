import { useWatchlistState } from "../providers/watchlistProvider";
import { Movie } from "../types/movie_types";
import { errorCard } from "../utils/movie-card-sample-data";
import MovieCard from "./movie-card";

export default function MovieResultsGrid({
  results,
}: {
  results: (Movie | undefined)[];
}) {
  const { watchlist, setWatchlist, existsInWatchlist } = useWatchlistState();

  const handleToggleSave = (
    id: string,
    title: string,
    movieExists: boolean
  ) => {
    // Make sure watchlist is not null and does not already include the movie.id
    if (!watchlist) {
      setWatchlist([{ id: id, title: title }]);
    } else if (watchlist && !movieExists) {
      setWatchlist([...watchlist, { id: id, title: title }]);
    } else if (watchlist && movieExists) {
      // If item exists, lets remove it from the watchlist
      setWatchlist(watchlist.filter((item) => item.id !== id));
    }
  };
  return (
    <div className="grid">
      {results.map((movie) => {
        if (movie) {
          const movieExists = existsInWatchlist(movie.id.toString());
          return (
            <MovieCard
              key={movie?.id} // add an || random unique key
              movie={movie === undefined ? errorCard : movie}
              handleToggleSave={handleToggleSave}
              movieExists={movieExists}
            />
          );
        }
      })}
    </div>
  );
}
