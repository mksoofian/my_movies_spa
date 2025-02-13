import { createContext, useContext, useEffect, useState } from "react";

type WatchlistObj = {
  id: string;
  title: string;
};

export type WatchlistStateType = {
  watchlist: null | WatchlistObj[];
  setWatchlist: (c: null | WatchlistObj[]) => void;
};

const WatchlistStateContext = createContext<WatchlistStateType>({
  watchlist: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setWatchlist: (c: null | WatchlistObj[]) => {},
});

const useWatchlistState = () => {
  const context = useContext(WatchlistStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateContext");
  }
  return context;
};

const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
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

export { GlobalStateProvider, useWatchlistState };
