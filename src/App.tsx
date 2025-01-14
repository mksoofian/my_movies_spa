import { useEffect, useState } from "react";
import "./App.css";
import { TopRatedMovies } from "./types/movie_types";

function App() {
  const [pageNum, setPageNum] = useState(1);
  const [topRateMovies, setTopRatedMovies] = useState<
    TopRatedMovies | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${
          import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN
        }`,
      },
    };
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageNum}&region=US`,
      options
    )
      .then((res) => {
        const data = res.json();
        return data;
      })
      .then((data) => {
        setTopRatedMovies(data);
      })
      .catch((err) => {
        setError(err);
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pageNum]);

  const handleClickPrevPage = () => {
    if (pageNum > 1) setPageNum(pageNum - 1);
  };

  const handleClickNextPage = () => {
    if (topRateMovies) {
      if (pageNum < topRateMovies?.total_pages) {
        setPageNum(pageNum + 1);
      }
    }
  };

  if (isLoading) return <p>Page is loading data...</p>;
  if (error) return <p>An error occurured: {error}</p>;

  return (
    <>
      <section className="section_centered">
        <h2> Top-Rated Movies</h2>
        <div className="grid">
          {topRateMovies?.results.map((movie) => {
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
          <p>Page: {topRateMovies?.page}</p>
          <button onClick={handleClickNextPage}>next</button>
        </div>
      </section>
    </>
  );
}

export default App;
