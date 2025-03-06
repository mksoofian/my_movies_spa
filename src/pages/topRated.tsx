import { useState } from "react";
import "../App.css";
import { useQuery } from "@tanstack/react-query";
import { MovieApiResponse } from "../types/movie_types";
import MovieResultsGrid from "../components/movie-resuts-grid";

function TopRated() {
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
  } = useQuery<MovieApiResponse>({
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
        <MovieResultsGrid results={topRatedMovies.results} />
      </section>
      <div className="pagination footerPagination">
        <button onClick={handleClickPrevPage}>prev</button>
        <p>Page: {topRatedMovies.page}</p>
        <button onClick={handleClickNextPage}>next</button>
      </div>
    </main>
  );
}

export default TopRated;
