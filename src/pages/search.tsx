import { useState, useEffect } from "react";
import SearchResults from "../components/search-results";
import { SearchIcon } from "lucide-react";

function Search() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1500);
    //cleanup
    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <main>
      <section>
        <h1>Search for Movies by Title</h1>
        <div className="search-input-container">
          <div className="search-input-wrapper">
            <SearchIcon className="search-icon" />
            <input
              value={query}
              placeholder={"Search movie title here"}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </section>
      <SearchResults query={debouncedQuery} />
    </main>
  );
}

export default Search;
