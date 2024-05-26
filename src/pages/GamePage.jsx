import PropTypes from "prop-types";
import { useRef, useState } from "react";
import GameStatus from "../components/GameStatus/GameStatus";
import Guesses from "../components/Guesses/Guesses";
import ImageBlur from "../components/ImageBlur/ImageBlur";
import SearchBar from "../components/SearchBar/SearchBar";
import { findGameObject } from "../javascript/game";
import { compareGuesses, createGuess } from "../javascript/guess";
import "./GamePage.css";

export default function GamePage({ games, totalGuesses = 8 }) {
  const [guessCount, setGuessCount] = useState(0);
  const [guessHistory, setGuessHistory] = useState([]);

  const [hasWon, setHasWon] = useState(false);

  const answer = useRef(games[Math.floor(Math.random() * games.length)]);

  const addGuess = (guess) => {
    setGuessHistory((prevHistory) => [...prevHistory, guess]);
  };

  const checkGuess = (guessInput) => {
    if (hasWon || guessCount == totalGuesses) return;
    const guess = findGameObject(guessInput, games);
    if (!guess) return;

    const evaluation = compareGuesses(guess, answer.current);
    if (evaluation === 100) setHasWon(true);
    addGuess(createGuess(guessInput, evaluation));
    setGuessCount((prevCount) => prevCount + 1);
  };

  return (
    <main id="game">
      <ImageBlur
        width="500px"
        height="500px"
        src={answer.current.imagesrc}
        alt="Mario game image"
        blur={hasWon ? 0 : 50 * (1 - guessCount / totalGuesses)}
      />
      <GameStatus
        numGuesses={guessCount}
        totalGuesses={totalGuesses}
        hasWon={hasWon}
      />
      <SearchBar games={games} onSearch={checkGuess} />
      <Guesses totalGuesses={totalGuesses} guessArray={guessHistory} />
    </main>
  );
}

const gamesPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    imagesrc: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    genre: PropTypes.arrayOf(PropTypes.string).isRequired,
    themes: PropTypes.arrayOf(PropTypes.string).isRequired,
    console: PropTypes.arrayOf(PropTypes.string).isRequired,
    developer: PropTypes.arrayOf(PropTypes.string).isRequired,
    publisher: PropTypes.arrayOf(PropTypes.string).isRequired,
  })
);

GamePage.propTypes = {
  games: gamesPropTypes.isRequired,
  totalGuesses: PropTypes.number,
};
