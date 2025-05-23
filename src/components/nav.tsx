import { Link } from "react-router";

function Nav() {
  return (
    <header>
      <nav>
        <Link to={"/watchlist"}>Watchlist</Link>
        <Link to={"/toprated"}>TopRated</Link>
        <Link to={"/search"}>Search</Link>
      </nav>
    </header>
  );
}

export default Nav;
