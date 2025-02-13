import { useWatchlistState } from "../providers/watchlistProvider";

function Watchlist() {
  const { watchlist } = useWatchlistState();

  console.log(watchlist);
  return <h1>My Watchlist</h1>;
}

export default Watchlist;
