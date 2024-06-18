import { Container } from "@chakra-ui/react";
import "./SearchResult.css";

export default function SearchResult({ game, onClick, selected }) {
  return (
    <Container
      onClick={() => onClick()}
      className={"search-result" + (selected ? " selected" : "")}
    >
      {game.title}
    </Container>
  );
}
