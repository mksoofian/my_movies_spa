import { useQuery } from "@tanstack/react-query";
import { MovieApiResponse } from "../types/movie_types";
import { useState } from "react";
import MovieResultsGrid from "./movie-resuts-grid";

const fetchTopRatedMovies = async (pageNumber: number) => {
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
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageNumber}&region=US`,
    options
  );
  const data = await response.json();
  return data;
};

export default function TopRatedMovieResults() {
  const [pageNum, setPageNum] = useState(1);

  const {
    isPending,
    error,
    data: topRatedMovies,
  } = useQuery<MovieApiResponse>({
    queryKey: ["fetchTopRated", pageNum],
    queryFn: fetchTopRatedMovies(pageNum),
  });

  const handleClickPrevPage = () => {
    if (pageNum > 1) setPageNum(pageNum - 1);
  };

  const handleClickNextPage = () => {
    if (topRatedMovies && pageNum < topRatedMovies?.total_pages) {
      setPageNum(pageNum + 1);
    }
  };

  if (isPending) return <p>Page is loading data...</p>;
  if (error) return <p>An error occured: {error.message}</p>;
  return (
    <>
      <section>
        <MovieResultsGrid results={topRatedMovies.results} />
      </section>
      <section>
        <div className="pagination footerPagination">
          <button onClick={handleClickPrevPage}>prev</button>
          <p>Page: {topRatedMovies.page}</p>
          <button onClick={handleClickNextPage}>next</button>
        </div>
      </section>
    </>
  );
}
