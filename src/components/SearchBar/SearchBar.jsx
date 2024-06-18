import { Box, Button, Flex, FormControl, Input } from "@chakra-ui/react";
import { useRef, useState } from "react";
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
        submitSearch(
          resultIndex !== null ? searchResults[resultIndex].title : searchInput
        );
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
    <Flex width="100%">
      <Flex className="search-bar-container" width="100%">
        <FormControl>
          <Input
            flex="1"
            ref={inputRef}
            onKeyDown={handleKey}
            onChange={handleInput}
            placeholder="place your guess here ..."
            name="search-bar"
            value={searchInput}
          />
        </FormControl>
        {searchInput !== "" && (
          <Box className="search-results-container">{searchResultsJSX}</Box>
        )}
      </Flex>
      <Button
        isLoading={!games.length}
        onClick={() => submitSearch(searchInput)}
      >
        Submit
      </Button>
    </Flex>
  );
}
