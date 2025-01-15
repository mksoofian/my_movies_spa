import { useState } from "react";
import "./App.css";
import { TopRatedMovies } from "./types/movie_types";
import { useQuery } from "@tanstack/react-query";

function App() {
  const [pageNum, setPageNum] = useState(1);
  const {
    isPending,
    error,
    data: topRatedMovies,
  } = useQuery({
    queryKey: ["fetchTopRated", pageNum],
    queryFn: async (): Promise<TopRatedMovies> => {
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
    },
  });

  const handleClickPrevPage = () => {
    if (pageNum > 1) setPageNum(pageNum - 1);
  };

  const handleClickNextPage = () => {
    if (topRatedMovies) {
      if (pageNum < topRatedMovies?.total_pages) {
        setPageNum(pageNum + 1);
      }
    }
  };

  if (isPending) return <p>Page is loading data...</p>;
  if (error) return <p>An error occured: {error.message}</p>;

  return (
    <>
      <section className="section_centered">
        <h2> Top-Rated Movies</h2>
        <div className="grid">
          {topRatedMovies.results.map((movie) => {
            return (
              <div key={movie.id} className="grid-item">
                {/* flex wrapper */}
                <div className="image">
                  <div className="wrapper">
                    {/* <a href={movie.backdrop_path} className="image"> */}
                    <img
                      className="poster"
                      src={`https://media.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path}`}
                    />
                    {/* </a> */}
                  </div>
                </div>
                <div className="content">
                  <h4>{movie.original_title}</h4>
                  {/* <p>Popularity Score:{movie.popularity}</p> */}
                  <p>Score: {Math.floor(movie.vote_average * 10)}%</p>
                  <p>{movie.original_language}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pagination">
          <button onClick={handleClickPrevPage}>prev</button>
          <p>Page: {topRatedMovies.page}</p>
          <button onClick={handleClickNextPage}>next</button>
        </div>
      </section>
    </>
  );
}

export default App;
