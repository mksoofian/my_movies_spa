import { useState, useEffect } from "react";
import SearchResults from "../components/search-results";

function Search() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedQuery(query);
      console.log("debounced");
    }, 1500);
    //cleanup
    return () => clearTimeout(debounceTimer);
  }, [query]);

  console.log("page rendering");

  return (
    <>
      <section>
        <h1>Search for Movies by Title</h1>
        <div className="search-input-container">
          <input
            value={query}
            placeholder={"Search movie title here"}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </section>
      <SearchResults query={debouncedQuery} />
    </>
  );
}

export default Search;
