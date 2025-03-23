import { Check, Plus } from "lucide-react";
import { dateFormatter } from "../utils/date-formatter";
import { Movie } from "../types/movie_types";

export default function MovieCard({
  movie,
  handleToggleSave,
  movieExists,
}: {
  movie: Movie;
  handleToggleSave: (id: string, title: string, movieExists: boolean) => void;
  movieExists: boolean;
}) {
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
                (movieExists
                  ? " favorite-button-checked"
                  : " favorite-button-default")
              }
              onClick={() =>
                handleToggleSave(movie.id.toString(), movie.title, movieExists)
              }
            >
              {movieExists ? <Check size={15} /> : <Plus size={15} />}
            </button>
          )}

          <img
            className="poster"
            src={`https://media.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path}`}
          />
        </div>
      </div>
      <div className="card-content">
        <h4 className="movie-title">{movie.title}</h4>
        <p className="movie-release-date">
          {dateFormatter(movie.release_date)}
        </p>
      </div>
    </div>
  );
}
