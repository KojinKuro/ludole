import "./SearchResult.css";

export default function SearchResult({ game, onClick, selected }) {
  return (
    <div
      onClick={() => onClick()}
      className={"search-result" + (selected ? " selected" : "")}
    >
      {game.title}
    </div>
  );
}
