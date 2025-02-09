import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { TopRatedMovies } from "./types/movie_types";
import { useQuery } from "@tanstack/react-query";


export type GlobalStateType = {
  firstname: string;
  lastname: string;
  age: string;
}
const GlobalStateContext = createContext({
  state: {} as Partial<GlobalStateType>,
  setState: {} as Dispatch<SetStateAction<Partial<GlobalStateType>>>,
});
const GlobalStateProvider = ({
  children,
  value = {} as GlobalStateType,
}: {
  children: React.ReactNode;
  value?: Partial<GlobalStateType>;
}) => {
  const [state, setState] = useState(value);
  return (
    <GlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};


export const useAuthContext = () => useContext(AuthContext);
export function AuthProvider = props => {
  const [pageNum, setPageNum] = useState(1);
  const [watchlist, setWatchlist] = useState<string[] | null>(null);
 

  useEffect(() => {
    const localData = localStorage.getItem("watchlist");
    if (localData) {
      setWatchlist(JSON.parse(localData));
    }
  }, []);

  const handleClickPrevPage = () => {
    if (pageNum > 1) setPageNum(pageNum - 1);
  };

  const handleClickNextPage = () => {
    if (topRatedMovies && pageNum < topRatedMovies?.total_pages) {
      setPageNum(pageNum + 1);
    }
  };

  useEffect(() => {
    if (watchlist) {
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }
  }, [watchlist]);

  const handleAddRemoveWatchlist = (id: string) => {
    // Make sure watchlist is not null and does not already include the movie.id
    if (!watchlist) {
      setWatchlist([id]);
    } else if (watchlist && !watchlist.includes(id)) {
      setWatchlist([...watchlist, id]);
    } else if (watchlist && watchlist.includes(id)) {
      // If item exists, lets remove it from the watchlist
      const newWatchlist = watchlist.filter((item) => item !== id);
      setWatchlist(newWatchlist);
    }
  };

  if (isPending) return <p>Page is loading data...</p>;
  if (error) return <p>An error occured: {error.message}</p>;

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        handleLogOut,
        idleTime,
        idleExpiresAt,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
