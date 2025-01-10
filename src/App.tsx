import { useEffect, useState } from "react";
import "./App.css";
import { TopRatedMovies } from "./types/movie_types";

function App() {
  const [pageNum, setPageNum] = useState(1);
  const [topRateMovies, setTopRatedMovies] = useState<
    TopRatedMovies | undefined
  >(undefined);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2M5M2U2YTgyN2FjYmYwYmEwM2E2NDVjNGRkMTdhZCIsIm5iZiI6MTczNjQ4MjMwOS43NjEsInN1YiI6IjY3ODA5ZTA1NDRkNjQ5ZmZhZTdiNjQ2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hgqBDYj8uKvadBciVh-y5juP19DkSSdIBgmMiMh3GA0",
      },
    };
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pageNum}`,
      options
    )
      .then((res) => {
        const data = res.json();
        return data;
      })
      .then((data) => {
        setTopRatedMovies(data);
      })
      .catch((err) => console.error(err));
  }, [pageNum]);

  return (
    <>
      <p>Page: {topRateMovies?.page}</p>
      {topRateMovies?.results.map((movie) => {
        return <p key={movie.id}>{movie.original_title}</p>;
      })}
    </>
  );
}

export default App;
