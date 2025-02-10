import {
  createContext,
  //   Dispatch,
  //   SetStateAction,
  useContext,
  useEffect,
  //   useEffect,
  useState,
} from "react";

export type GlobalStateType = {
  watchlist: string[] | null;
  setWatchlist: (c: string[] | null) => void;
};

const GlobalStateContext = createContext<GlobalStateType>({
  watchlist: null,
  setWatchlist: (c: string[] | null) => {},
});

const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateContext");
  }
  return context;
};
const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [watchlist, setWatchlist] = useState(null);

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
    <GlobalStateContext.Provider value={{ watchlist, setWatchlist }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateProvider, useGlobalState };
