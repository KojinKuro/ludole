import { useRef, useState } from "react";
import { findGameObject } from "../../javascript/game";
import { compareGuesses, createGuess } from "../../javascript/guess";
import GameStatus from "../GameStatus/GameStatus";
import Guesses from "../Guesses/Guesses";
import ImageBlur from "../ImageBlur/ImageBlur";
import "./Game.css";

export default function Game({ games, totalGuesses = 8 }) {
  const [guessCount, setGuessCount] = useState(0);
  const [guessHistory, setGuessHistory] = useState([]);
  const [guessInput, setGuessInput] = useState("");

  const [gameError, setGameError] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  const answerGame = useRef(games[Math.floor(Math.random() * games.length)]);

  const addGuess = (guess) => {
    setGuessHistory((prevHistory) => [...prevHistory, guess]);
  };

  const checkGuess = () => {
    if (hasWon) return;
    const guessGame = findGameObject(guessInput, games);
    if(!guessGame) {
      setGameError(true);
      return;
    }
  
    const evaluation = compareGuesses(guessGame, answerGame.current);
    if (evaluation === 100) setHasWon(true);
    addGuess(createGuess(guessInput, evaluation));
    setGuessCount((prevCount) => prevCount + 1);
    setGuessInput("");
  };

  const handleInput = (e) => {
    if(gameError) setGameError(false);
    setGuessInput(e.target.value);
  }

  return (
    <main id="game">
      <ImageBlur
        width="500px"
        height="500px"
        src={answerGame.current.imagesrc}
        alt="Mario game image"
        blur={hasWon ? 0 : 50 * (1 - guessCount / totalGuesses)}
      />
      <GameStatus
        numGuesses={guessCount}
        totalGuesses={totalGuesses}
        hasWon={hasWon}
      />
      {gameError && <div>Could not find your game</div>}
      <div>
        <input
          onKeyDown={(e) => { if (e.key === "Enter") checkGuess(); }}
          onChange={handleInput}
          type="text"
          placeholder="place your guess here ..."
          value={guessInput}
        />
        <button onClick={checkGuess}>Submit</button>
      </div>
      <Guesses totalGuesses={totalGuesses} guessArray={guessHistory} />
    </main>
  );
}
