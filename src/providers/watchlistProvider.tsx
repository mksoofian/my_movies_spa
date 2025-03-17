import { createContext, useContext, useEffect, useState } from "react";
import { WatchlistObj } from "../types/movie_types";

export type WatchlistStateType = {
  watchlist: [] | WatchlistObj[];
  setWatchlist: (c: [] | WatchlistObj[]) => void;
  watchlistChecker: (id: string) => boolean;
};

const WatchlistStateContext = createContext<WatchlistStateType>({
  watchlist: [],
  setWatchlist: () => {},
  watchlistChecker: () => false,
});

const useWatchlistState = () => {
  const context = useContext(WatchlistStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateContext");
  }
  return context;
};

const WatchlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [watchlist, setWatchlist] = useState<[] | WatchlistObj[]>([]);

  useEffect(() => {
    const localData = localStorage.getItem("watchlist");
    if (localData) {
      setWatchlist(JSON.parse(localData));
    }
  }, []);

  useEffect(() => {
    if (watchlist.length > 0) {
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }
  }, [watchlist]);

  const watchlistChecker = (id: string) => {
    return watchlist?.some((obj) => obj.id === id);
  };

  return (
    <WatchlistStateContext.Provider
      value={{ watchlist, setWatchlist, watchlistChecker }}
    >
      {children}
    </WatchlistStateContext.Provider>
  );
};

export { WatchlistProvider, useWatchlistState };
