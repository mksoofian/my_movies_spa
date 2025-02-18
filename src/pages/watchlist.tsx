import { useEffect, useState } from "react";
import { useWatchlistState } from "../providers/watchlistProvider";
// import { useQueries, useQuery } from "@tanstack/react-query";
import { MovieApiResponse } from "../types/movie_types";

function Watchlist() {
  const { watchlist } = useWatchlistState();
  const [watchlistFromApi, setWatchlistFromApi] = useState([]);
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

    watchlist.forEach(async (movie) => {
      const movieResult = await fetchWatchlistAPI(movie.title);

      //   setWatchlistFromApi();
      console.log(
        movie,
        movieResult.results.find((item) => item.id.toString() === movie.id)
      );
    });
  }, [watchlist]);

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

  return <h1>My Watchlist</h1>;
}

export default Watchlist;
