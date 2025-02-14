import { createContext, useContext, useEffect, useState } from "react";
import { WatchlistObj } from "../types/movie_types";

export type WatchlistStateType = {
  watchlist: null | WatchlistObj[];
  setWatchlist: (c: null | WatchlistObj[]) => void;
};

const WatchlistStateContext = createContext<WatchlistStateType>({
  watchlist: null,
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
  const [watchlist, setWatchlist] = useState<null | WatchlistObj[]>(null);

  useEffect(() => {
    const localData = localStorage.getItem("watchlist");
    if (localData) {
      setWatchlist(JSON.parse(localData));
    }
  }, []);

  useEffect(() => {
    if (watchlist) {
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
