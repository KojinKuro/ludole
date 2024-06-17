import { formatDate, toDate } from "date-fns";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import GameStatus from "../../components/GameStatus/GameStatus";
import Guesses from "../../components/Guesses/Guesses";
import ImageBlur from "../../components/ImageBlur/ImageBlur";
import SearchBar from "../../components/SearchBar/SearchBar";
import { getChallenge } from "../../javascript/apiCalls";
import { findGameObject } from "../../javascript/game";
import { compareGuesses, createGuess } from "../../javascript/guess";
import "./GamePage.css";

export default function GamePage({ games, totalGuesses = 8 }) {
  const [guessCount, setGuessCount] = useState(0);
  const [guessHistory, setGuessHistory] = useState([]);
  const [hasWon, setHasWon] = useState(false);
  const [challenge, setChallenge] = useState(null);

  const { date } = useParams();
  let formattedDate;
  if (!date) {
    formattedDate = new Date();
  } else {
    // fix timezone issue
    formattedDate = new Date(date);
    formattedDate = new Date(
      formattedDate.valueOf() + formattedDate.getTimezoneOffset() * 60 * 1000
    );
  }

  useEffect(() => {
    getChallenge(formatDate(formattedDate, "yyyy-MM-dd")).then(setChallenge);
  }, [date]);

  const addGuess = (guess) => {
    setGuessHistory((prevHistory) => [...prevHistory, guess]);
  };

  const checkGuess = (guessInput) => {
    if (hasWon || guessCount == totalGuesses) return;
    const guess = findGameObject(guessInput, games);
    if (!guess) return;

    const evaluation = compareGuesses(guess, challenge);
    if (evaluation === 100) setHasWon(true);
    addGuess(createGuess(guessInput, evaluation));
    setGuessCount((prevCount) => prevCount + 1);
  };

  return (
    <main id="game">
      <ImageBlur
        size="500px"
        src={challenge?.imagesrc}
        alt={challenge?.title}
        blur={hasWon ? 0 : 1 - guessCount / totalGuesses}
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

GamePage.propTypes = {
  games: PropTypes.arrayOf(
    PropTypes.shape({
      game_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      imagesrc: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      genre: PropTypes.arrayOf(PropTypes.string).isRequired,
      themes: PropTypes.arrayOf(PropTypes.string).isRequired,
      console: PropTypes.arrayOf(PropTypes.string).isRequired,
      developer: PropTypes.arrayOf(PropTypes.string).isRequired,
      publisher: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  totalGuesses: PropTypes.number,
};
