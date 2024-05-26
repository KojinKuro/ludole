import { useEffect, useRef, useState } from "react";
import "./SearchBar.css";
import SearchResult from "./SearchResult";

export default function SearchBar({ games, onSearch = () => {} }) {
  const [searchInput, setSearchInput] = useState("");
  const [resultIndex, setResultIndex] = useState(null);
  const inputRef = useRef(null);

  const submitSearch = (gameTitle) => {
    onSearch(gameTitle);
    setSearchInput("");
    setResultIndex(null);
    inputRef.current.focus();
  };

  const searchResults = games
    .filter((game) =>
      game.title.toLowerCase().includes(searchInput.toLowerCase())
    )
    .sort((a, b) => a.title.localeCompare(b.title))
    .slice(0, 5);

  const searchResultsJSX = searchResults.map((game, index) => (
    <SearchResult
      selected={index === resultIndex}
      key={game.id}
      game={game}
      onClick={() => submitSearch(game.title)}
    />
  ));

  const handleInput = (e) => {
    setSearchInput(e.target.value);
    setResultIndex(null);
  };

  const handleKey = (e) => {
    switch (e.key) {
      case "Enter":
        if (resultIndex !== null) {
          submitSearch(searchResults[resultIndex].title);
        } else {
          submitSearch(searchInput);
        }
        break;
      case "Escape":
        setSearchInput("");
        setResultIndex(null);
        break;
      case "ArrowUp":
        if (resultIndex === null) {
          setResultIndex(searchResults.length - 1);
        } else if (resultIndex - 1 < 0) {
          setResultIndex(null);
        } else {
          setResultIndex((prevIndex) => --prevIndex);
        }
        break;
      case "ArrowDown":
        // on arrow down
        if (resultIndex === null) {
          setResultIndex(0);
        } else if (resultIndex + 1 >= searchResults.length) {
          setResultIndex(null);
        } else {
          setResultIndex((prevIndex) => ++prevIndex);
        }
        break;
    }
  };

  return (
    <div className="search-bar-root">
      <div className="search-bar-container">
        <label htmlFor="search-bar">Game Input</label>
        <input
          ref={inputRef}
          onKeyDown={handleKey}
          onChange={handleInput}
          type="text"
          placeholder="place your guess here ..."
          name="search-bar"
          value={searchInput}
        />
        {searchInput !== "" && (
          <div className="search-results-container">{searchResultsJSX}</div>
        )}
      </div>
      <button onClick={() => submitSearch(searchInput)}>Submit</button>
    </div>
  );
}
