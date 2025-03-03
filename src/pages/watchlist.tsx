import { useState } from "react";
import { useWatchlistState } from "../providers/watchlistProvider";
import { useQueries } from "@tanstack/react-query";
import { Movie, MovieApiResponse } from "../types/movie_types";
import MovieCard from "../components/movie-card";
import { errorCard } from "../utils/movie-card-sample-data";

function Watchlist() {
  const { watchlist } = useWatchlistState();
  const [watchlistFromApi, setWatchlistFromApi] = useState<Movie[] | []>([]);
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [pageNum, setPageNum] = useState(1);

  //   useEffect(() => {
  //     const fetchWatchlistAPI = async (
  //       title: string
  //     ): Promise<MovieApiResponse> => {
  //       const options = {
  //         method: "GET",
  //         headers: {
  //           accept: "application/json",
  //           Authorization: `Bearer ${
  //             import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN
  //           }`,
  //         },
  //       };
  //       const response = await fetch(
  //         `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=${1}`,
  //         options
  //       );
  //       const data = await response.json();
  //       return data;
  //     };

  //For each id in watchlist, fetch movies with that id
  //If the result has a corresponding ID, add it to the watchlistFromApi
  //     const tempWatchlist: Movie[] = [];
  //     watchlist.forEach(async (movie) => {
  //       const movieResult = await fetchWatchlistAPI(movie.title);
  //       const movieMatchFound = movieResult.results.find(
  //         (item) => item.id.toString() === movie.id
  //       );
  //       if (movieMatchFound) {
  //         tempWatchlist.push(movieMatchFound);
  //         // setWatchlistFromApi([...watchlistFromApi, movieMatchFound]);
  //         setWatchlistFromApi(tempWatchlist);
  //       }
  //     });
  //     setIsLoading(false);
  //   }, [watchlist]);

  const fetchWatchlistAPI = async (title: string, id: string) => {
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

    const data: MovieApiResponse = await response.json();

    //Finds movie in results matching to the movie ID we provided from our watchlist
    const movieMatchFound = data.results.find(
      (movie) => movie.id.toString() === id
    );
    if (movieMatchFound) return movieMatchFound;
    // If movieMatchFound was undefined, check the next page of results
    /////// ADD RECURSION to cycle through pages or results to make sure no match exists...
  };

  const watchlistSearchResultsFromAPI = useQueries({
    queries: watchlist.map((movie) => ({
      queryKey: ["movieID", movie.id],
      queryFn: () => fetchWatchlistAPI(movie.title, movie.id),
      staleTime: Infinity,
    })),
    combine: (results) => {
      return {
        data: results.map((result) =>
          result === undefined ? errorCard : result.data
        ),
        pending: results.some((result) => result.isPending),
      };
    },
  });
  console.log(watchlistSearchResultsFromAPI);
  if (watchlistSearchResultsFromAPI.pending)
    return <p>Page is loading data...</p>;

  if (
    !watchlistSearchResultsFromAPI.pending &&
    watchlistSearchResultsFromAPI.data.length > 0 &&
    !watchlistSearchResultsFromAPI.data.some((movie) => movie !== undefined)
  ) {
    console.log(watchlistSearchResultsFromAPI.data);
    setWatchlistFromApi(watchlistSearchResultsFromAPI.data);
  }
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

  if (!watchlist) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>My Watchlist</h1>
      <div className="grid">
        {watchlistFromApi.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
    </>
  );
}

export default Watchlist;
