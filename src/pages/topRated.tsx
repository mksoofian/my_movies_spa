import "../App.css";
import TopRatedMovieResults from "../components/movie-results-toprated";

function TopRated() {
  return (
    <main>
      <section className="section_centered">
        <div className="header">
          <h1> Top-Rated Movies</h1>
        </div>
      </section>
      <TopRatedMovieResults />
    </main>
  );
}

export default TopRated;
