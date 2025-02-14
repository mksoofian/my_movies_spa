import { useState } from "react";
import "../App.css";
import { useQuery } from "@tanstack/react-query";
import { Check, Plus } from "lucide-react";
import { TopRatedMovies } from "../types/movie_types";
import { dateFormatter } from "../utils/date-formatter";
import { useWatchlistState } from "../providers/watchlistProvider";

function TopRated() {
  const { watchlist, setWatchlist } = useWatchlistState();
  const [pageNum, setPageNum] = useState(1);

  const fetchTopRatedMovies = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${
          import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN
        }`,
      },
    };
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageNum}&region=US`,
      options
    );
    const data = await response.json();
    return data;
  };
  const {
    isPending,
    error,
    data: topRatedMovies,
  } = useQuery<TopRatedMovies>({
    queryKey: ["fetchTopRated", pageNum],
    queryFn: fetchTopRatedMovies,
  });

  const handleClickPrevPage = () => {
    if (pageNum > 1) setPageNum(pageNum - 1);
  };

  const handleClickNextPage = () => {
    if (topRatedMovies && pageNum < topRatedMovies?.total_pages) {
      setPageNum(pageNum + 1);
    }
  };

  const handleAddRemoveWatchlist = (id: string, title: string) => {
    // Make sure watchlist is not null and does not already include the movie.id
    if (!watchlist) {
      setWatchlist([{ id: id, title: title }]);
    } else if (watchlist && !watchlist.includes(id)) {
      setWatchlist([...watchlist, { id: id, title: title }]);
    } else if (watchlist && watchlist.includes(id)) {
      // If item exists, lets remove it from the watchlist
      setWatchlist(watchlist.filter((item) => item.id !== id));
    }
  };

  if (isPending) return <p>Page is loading data...</p>;
  if (error) return <p>An error occured: {error.message}</p>;

  return (
    <main>
      <section className="section_centered">
        <div className="header">
          <h1> Top-Rated Movies</h1>
          <div className="pagination">
            <button onClick={handleClickPrevPage}>prev</button>
            <p>Page: {topRatedMovies.page}</p>
            <button onClick={handleClickNextPage}>next</button>
          </div>
        </div>
        <div className="grid">
          {topRatedMovies.results.map((movie) => {
            return (
              <div key={movie.id} className="grid-item">
                <div className="card-image">
                  <div className="image-wrapper">
                    {/* <a href={movie.backdrop_path} className="image"> */}
                    <div className="voter-score">
                      <p> {Math.floor(movie.vote_average * 10)}</p>{" "}
                      <span>%</span>
                    </div>

                    <button
                      className={
                        "favorite-button" +
                        (watchlist?.includes(movie.id.toString())
                          ? " favorite-button-checked"
                          : " favorite-button-default")
                      }
                      onClick={() =>
                        handleAddRemoveWatchlist(
                          movie.id.toString(),
                          movie.title
                        )
                      }
                    >
                      {watchlist?.includes(movie.id.toString()) ? (
                        <Check size={15} />
                      ) : (
                        <Plus size={15} />
                      )}
                    </button>

                    <img
                      className="poster"
                      src={`https://media.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path}`}
                    />

                    {/* </a> */}
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
          })}
        </div>
      </section>
      <div className="pagination">
        <button onClick={handleClickPrevPage}>prev</button>
        <p>Page: {topRatedMovies.page}</p>
        <button onClick={handleClickNextPage}>next</button>
      </div>
    </main>
  );
}

export default TopRated;
