import { useEffect, useState } from "react";
import { useWatchlistState } from "../providers/watchlistProvider";
// import { useQueries, useQuery } from "@tanstack/react-query";
import { Movie, MovieApiResponse } from "../types/movie_types";
import { dateFormatter } from "../utils/date-formatter";
import { Check, Plus } from "lucide-react";

function Watchlist() {
  const { watchlist, setWatchlist } = useWatchlistState();
  const [watchlistFromApi, setWatchlistFromApi] = useState<Movie[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  //   const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    const fetchWatchlistAPI = async (
      title: string
    ): Promise<MovieApiResponse> => {
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
        `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=${1}`,
        options
      );
      const data = await response.json();
      return data;
    };

    //For each id in watchlist, fetch movies with that id
    //If the result has a corresponding ID, add it to the watchlistFromApi
    const tempWatchlist: Movie[] = [];
    watchlist.forEach(async (movie) => {
      const movieResult = await fetchWatchlistAPI(movie.title);
      const movieMatchFound = movieResult.results.find(
        (item) => item.id.toString() === movie.id
      );
      if (movieMatchFound) {
        tempWatchlist.push(movieMatchFound);
        // setWatchlistFromApi([...watchlistFromApi, movieMatchFound]);
        setWatchlistFromApi(tempWatchlist);
      }
    });
    setIsLoading(false);
  }, [watchlist]);

  const watchlistChecker = (id: string) => {
    return watchlist?.some((obj) => obj.id === id) ? true : false;
  };

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

  //   const fetchMoviesFromWatchlist = useQueries({
  //     queries: watchlist.map((movie) => {
  //       return {
  //         queryKey: ["movieKey", movie],
  //         queryFn: fetchWatchlistAPI(movie.title),
  //         // enabled: !!watchlist,
  //       };
  //     }),
  // queryKey: ["fetchMyWatchlist", pageNum],
  // queryFn: fetchWatchlistAPI,
  //   });

  //   if (isPending) return <p>Page is loading data...</p>;
  //   if (error) return <p>An error occured: {error.message}</p>;

  // const handleAddRemoveWatchlist = (id: string, title: string) => {
  //   // Make sure watchlist is not null and does not already include the movie.id
  //   if (!watchlist) {
  //     setWatchlist([{ id: id, title: title }]);
  //   } else if (watchlist && !watchlistChecker(id)) {
  //     setWatchlist([...watchlist, { id: id, title: title }]);
  //   } else if (watchlist && watchlistChecker(id)) {
  //     // If item exists, lets remove it from the watchlist
  //     setWatchlist(watchlist.filter((item) => item.id !== id));
  //   }
  // };

  console.log(watchlistFromApi);

  if (!watchlist || isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>My Watchlist</h1>
      <div className="grid">
        {watchlistFromApi.map((movie) => {
          return (
            <div key={movie.id} className="grid-item">
              <div className="card-image">
                <div className="image-wrapper">
                  <div className="voter-score">
                    <p> {Math.floor(movie.vote_average * 10)}</p> <span>%</span>
                  </div>

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
        })}
      </div>
    </>
  );
}

export default Watchlist;
