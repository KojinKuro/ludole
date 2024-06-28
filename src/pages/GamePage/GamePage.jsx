import { Flex } from "@chakra-ui/react";
import { formatDate } from "date-fns";
import PropTypes from "prop-types";
import { useEffect, useReducer, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router";

import GameStatus from "../../components/GameStatus/GameStatus";
import Guesses from "../../components/Guesses/Guesses";
import ImageBlur from "../../components/ImageBlur/ImageBlur";
import SearchBar from "../../components/SearchBar/SearchBar";
import { getChallenge, getGames } from "../../javascript/apiCalls";
import { getLocalDate } from "../../javascript/date";
import { findGameObject } from "../../javascript/game";
import { compareGuesses, createGuess } from "../../javascript/guess";
import { loadGameDate, saveGameDate } from "../../javascript/save";
import "./GamePage.css";

function reducer(state, action) {
  switch (action.type) {
    case "CHECK_GUESS":
      if (state.hasWon || state.guessCount == state.totalGuesses) break;
      const guess = findGameObject(action.guess, state.games);
      if (!guess) break;

      const evaluation = compareGuesses(guess, state.challenge);
      const currentGameState = {
        totalGuesses: state.totalGuesses,
        hasWon: Boolean(evaluation === 100),
        guessHistory: [
          ...state.guessHistory,
          createGuess(action.guess, evaluation),
        ],
      };

      saveGameDate(state.date, currentGameState);
      return {
        ...state,
        ...currentGameState,
      };
    case "URL_UPDATE":
      const saveData = loadGameDate(action.date);
      return {
        ...state,
        challenge: action.challenge,
        date: action.date,
        totalGuesses: saveData ? saveData.totalGuesses : 8,
        guessHistory: saveData ? saveData.guessHistory : [],
        hasWon: saveData ? saveData.hasWon : false,
      };
    case "UPDATE_PROPS":
      return {
        ...state,
        games: action.games,
        totalGuesses: action.totalGuesses,
      };
  }

  return state;
}

export default function GamePage({ totalGuesses = 8 }) {
  const [games, setGames] = useState([]);
  const { showBoundary } = useErrorBoundary();
  const { date } = useParams();
  const [state, dispatch] = useReducer(reducer, {
    totalGuesses: totalGuesses,
    games: games,
    guessHistory: [],
    hasWon: false,
    challenge: null,
    date: null,
  });

  useEffect(() => {
    getGames().then(setGames).catch(showBoundary);
  }, []);

  useEffect(() => {
    const localDate = !date ? new Date() : getLocalDate(date);
    const formattedDate = formatDate(localDate, "yyyy-MM-dd");
    document.title = `Ludole (${formatDate(localDate, "MM-dd")})`;

    getChallenge(formattedDate)
      .then((challenge) => {
        dispatch({
          type: "URL_UPDATE",
          challenge: challenge,
          date: formattedDate,
        });
      })
      .catch(showBoundary);
  }, [date]);

  useEffect(() => {
    dispatch({
      type: "UPDATE_PROPS",
      games: games,
      totalGuesses: totalGuesses,
    });
  }, [games, totalGuesses]);

  const checkGuess = (guess) => {
    dispatch({ type: "CHECK_GUESS", guess: guess });
  };

  return (
    <Flex as="main" direction="column" id="game" gap="15px">
      <ImageBlur
        size="500px"
        src={state.challenge?.imagesrc}
        alt={state.challenge?.title}
        blur={
          state.hasWon ? 0 : 1 - state.guessHistory.length / state.totalGuesses
        }
      />
      <GameStatus
        numGuesses={state.guessHistory.length}
        totalGuesses={state.totalGuesses}
        hasWon={state.hasWon}
      />
      <SearchBar games={state.games} onSearch={checkGuess} />
      <Guesses
        totalGuesses={state.totalGuesses}
        guessArray={state.guessHistory}
      />
    </Flex>
  );
}

GamePage.propTypes = {
  // games: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     game_id: PropTypes.number.isRequired,
  //     title: PropTypes.string.isRequired,
  //     imagesrc: PropTypes.string.isRequired,
  //     year: PropTypes.number.isRequired,
  //     genre: PropTypes.arrayOf(PropTypes.string).isRequired,
  //     themes: PropTypes.arrayOf(PropTypes.string).isRequired,
  //     console: PropTypes.arrayOf(PropTypes.string).isRequired,
  //     developer: PropTypes.arrayOf(PropTypes.string).isRequired,
  //     publisher: PropTypes.arrayOf(PropTypes.string).isRequired,
  //   })
  // ).isRequired,
  totalGuesses: PropTypes.number,
};
