import { useWatchlistState } from "../providers/watchlistProvider";
import { useQueries } from "@tanstack/react-query";
import { MovieApiResponse } from "../types/movie_types";
import { errorCard } from "../utils/movie-card-sample-data";
import MovieResultsGrid from "../components/movie-resuts-grid";

function Watchlist() {
  const { watchlist } = useWatchlistState();

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

  if (watchlistSearchResultsFromAPI.pending)
    return <p>Page is loading data...</p>;

  if (!watchlist) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>My Watchlist</h1>
      <MovieResultsGrid results={watchlistSearchResultsFromAPI.data} />
    </>
  );
}

export default Watchlist;
