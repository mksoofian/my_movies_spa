// import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";

function Search() {
  //   const [pageNum, setPageNum] = useState(1);
  //   const [query, setQuery] = useState("");

  //   const fetchWatchlistAPI = async () => {
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         accept: "application/json",
  //         Authorization: `Bearer ${
  //           import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN
  //         }`,
  //       },
  //     };
  //     const response = await fetch(
  //       `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${pageNum}`,
  //       options
  //     );
  //     const data = await response.json();
  //     return data;
  //   };
  //   const {
  //     isPending,
  //     error,
  //     data: searchedMovies,
  //   } = useQuery<TopRatedMovies>({
  //     queryKey: ["fetchMyWatchlist", pageNum],
  //     queryFn: fetchWatchlistAPI,
  //   });
  return (
    <>
      <h1>Search for Movies by Title</h1>
      <input />
    </>
  );
}

export default Search;
