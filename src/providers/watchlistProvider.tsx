import { createContext, useContext, useEffect, useState } from "react";
import { WatchlistObj } from "../types/movie_types";

export type WatchlistStateType = {
  watchlist: [] | WatchlistObj[];
  setWatchlist: (c: [] | WatchlistObj[]) => void;
};

const WatchlistStateContext = createContext<WatchlistStateType>({
  watchlist: [],
  setWatchlist: () => {},
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

  return (
    <WatchlistStateContext.Provider value={{ watchlist, setWatchlist }}>
      {children}
    </WatchlistStateContext.Provider>
  );
};

export { WatchlistProvider, useWatchlistState };
