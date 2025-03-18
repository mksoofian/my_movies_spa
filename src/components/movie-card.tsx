import { Check, Plus } from "lucide-react";
import { dateFormatter } from "../utils/date-formatter";
import { useWatchlistState } from "../providers/watchlistProvider";
import { Movie } from "../types/movie_types";

export default function MovieCard({ movie }: { movie: Movie }) {
  const { watchlist, setWatchlist, watchlistChecker } = useWatchlistState();

  const handleAddRemoveWatchlist = (id: string, title: string) => {
    // Make sure watchlist is not null and does not already include the movie.id
    if (!watchlist) {
      setWatchlist([{ id: id, title: title }]);
    } else if (watchlist && !watchlistChecker(id)) {
      setWatchlist([...watchlist, { id: id, title: title }]);
    } else if (watchlist && watchlistChecker(id)) {
      // If item exists, lets remove it from the watchlist
      setWatchlist(watchlist.filter((item) => item.id !== id));
    }
  };

  return (
    <div key={movie.id} className="grid-item">
      <div className="card-image">
        <div className="image-wrapper">
          <div className="voter-score">
            <p> {Math.floor(movie.vote_average * 10)}</p> <span>%</span>
          </div>
          {movie.title === "null" ? (
            ""
          ) : (
            <button
              className={
                "favorite-button" +
                (watchlistChecker(movie.id.toString())
                  ? " favorite-button-checked"
                  : " favorite-button-default")
              }
              onClick={() =>
                handleAddRemoveWatchlist(movie.id.toString(), movie.title)
              }
            >
              {watchlistChecker(movie.id.toString()) ? (
                <Check size={15} />
              ) : (
                <Plus size={15} />
              )}
            </button>
          )}

          <img
            className="poster"
            src={`https://media.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path}`}
          />
        </div>
      </div>
      <div className="card-content">
        <h4 className="movie-title">{movie.original_title}</h4>
        <p className="movie-release-date">
          {dateFormatter(movie.release_date)}
        </p>
      </div>
    </div>
  );
}
