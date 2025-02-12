import { createContext, useContext, useEffect, useState } from "react";

export type WatchlistStateType = {
  watchlist: string[] | null;
  setWatchlist: (c: string[] | null) => void;
};

const WatchlistStateContext = createContext<WatchlistStateType>({
  watchlist: null,
  setWatchlist: (c: string[] | null) => {},
});

const useWatchlistState = () => {
  const context = useContext(WatchlistStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateContext");
  }
  return context;
};
const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [watchlist, setWatchlist] = useState<string[] | null>(null);

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

export { GlobalStateProvider, useWatchlistState };
