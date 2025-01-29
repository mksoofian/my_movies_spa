import { useEffect, useState } from "react";
import "./App.css";
import { TopRatedMovies } from "./types/movie_types";
import { useQuery } from "@tanstack/react-query";
import { dateFormatter } from "./utils/date-formatter";
import { Plus } from "lucide-react";

function App() {
  console.log(`running app`);
  const [pageNum, setPageNum] = useState(1);
  const [watchlist, setWatchlist] = useState<string[] | null>(null);
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
  } = useQuery<TopRatedMovies>({
    queryKey: ["fetchTopRated", pageNum],
    queryFn: fetchTopRatedMovies,
  });

  useEffect(() => {
    const localData = localStorage.getItem("watchlist");
    console.log(`useEffect 01: ${localData}`);

    if (localData) {
      setWatchlist(JSON.parse(localData));
      console.log(`useEffect 02: ${localData}`);
    }
  }, []);

  //   useEffect(() => {
  //     // const localData = localStorage.getItem("watchlist");
  //     console.log(`watchList changed to: ${watchlist}, setting localStorage`);
  //     localStorage.setItem("watchlist", JSON.stringify(watchlist));
  //     const localData = localStorage.getItem("watchlist");
  //     console.log(`localStorage set to: ${localData}`);
  //   }, [watchlist]);

  const handleClickPrevPage = () => {
    if (pageNum > 1) setPageNum(pageNum - 1);
  };

  const handleClickNextPage = () => {
    if (topRatedMovies && pageNum < topRatedMovies?.total_pages) {
      setPageNum(pageNum + 1);
    }
  };

  const handleAddtoWatchlist = (id: string) => {
    // Make sure watchlist is not null and does not already include the movie.id
    if (!watchlist) {
      setWatchlist([id]);
      console.log(`new watchlist ${watchlist}`);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    } else if (watchlist && watchlist.includes(id) === false) {
      setWatchlist([...watchlist, id]);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
      console.log(`adding to watchlist ${id}, updated watchlist: ${watchlist}`);
    } else if (watchlist && watchlist.includes(id)) {
      console.log(`Movie id ${id} is already in your watchlist`);
      return;
    }
  };

  if (isPending) return <p>Page is loading data...</p>;
  if (error) return <p>An error occured: {error.message}</p>;

  return (
    <main>
      <section className="section_centered">
        <div className="header-nav">
          <h2> Top-Rated Movies</h2>
          <div className="pagination">
            <button onClick={handleClickPrevPage}>prev</button>
            <p>Page: {topRatedMovies.page}</p>
            <button onClick={handleClickNextPage}>next</button>
          </div>
        </div>
        <div className="grid">
          {topRatedMovies.results.map((movie) => {
            return (
              <div key={movie.id} className="grid-item">
                <div className="card-image">
                  <div className="image-wrapper">
                    {/* <a href={movie.backdrop_path} className="image"> */}
                    <div className="voter-score">
                      <p> {Math.floor(movie.vote_average * 10)}</p>{" "}
                      <span>%</span>
                    </div>

                    <button
                      className="favorite-button"
                      onClick={() => handleAddtoWatchlist(movie.id.toString())}
                    >
                      <Plus size={15} />
                    </button>

                    <img
                      className="poster"
                      src={`https://media.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path}`}
                    />

                    {/* </a> */}
                  </div>
                </div>
                <div className="card-content">
                  <h4 className="movie-title">{movie.original_title}</h4>
                  {/* <p>Popularity Score:{movie.popularity}</p> */}
                  <p className="movie-release-date">
                    {dateFormatter(movie.release_date)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <div className="pagination">
        <button onClick={handleClickPrevPage}>prev</button>
        <p>Page: {topRatedMovies.page}</p>
        <button onClick={handleClickNextPage}>next</button>
      </div>
    </main>
  );
}

export default App;
