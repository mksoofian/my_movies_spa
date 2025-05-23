import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MovieApiResponse } from "../types/movie_types";
import MovieResultsGrid from "../components/movie-resuts-grid";

function SearchResults({ query }: { query: string }) {
  const [pageNum, setPageNum] = useState(1);

  const fetchMovieAPI = async () => {
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
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${pageNum}`,
      options
    );

    const data = await response.json();
    console.log(data);
    return data;
  };

  const {
    isPending,
    isError,
    error,
    data: searchedMovies,
  } = useQuery<MovieApiResponse>({
    queryKey: ["fetchMovieAPI", query, pageNum],
    queryFn: fetchMovieAPI,
  });

  const handleClickPrevPage = () => {
    if (pageNum > 1) setPageNum(pageNum - 1);
  };

  const handleClickNextPage = () => {
    if (searchedMovies && pageNum < searchedMovies?.total_pages) {
      setPageNum(pageNum + 1);
    }
  };

  if (isPending) return <p>Loading data...</p>;
  if (isError) {
    return (
      <>
        <h1>Search for Movies by Title</h1>
        <p>Error fetching movie data: {error.message}</p>
      </>
    );
  }

  return (
    <>
      <section>
        <MovieResultsGrid results={searchedMovies.results} />
      </section>
      {searchedMovies.results.length > 0 ? (
        <section>
          <div className="pagination">
            <button onClick={handleClickPrevPage}>prev</button>
            <p>Page: {searchedMovies.page}</p>
            <button onClick={handleClickNextPage}>next</button>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
}

export default SearchResults;
