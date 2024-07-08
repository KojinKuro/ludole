import { Box } from "@chakra-ui/react";
import "./SearchResult.css";

export default function SearchResult({ game, onClick, selected }) {
  return (
    <Box
      onClick={() => onClick()}
      className={"search-result" + (selected ? " selected" : "")}
    >
      {game.title}
    </Box>
  );
}
