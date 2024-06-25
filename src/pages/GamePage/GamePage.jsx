import { Flex } from "@chakra-ui/react";
import { formatDate } from "date-fns";
import PropTypes from "prop-types";
import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router";
import GameStatus from "../../components/GameStatus/GameStatus";
import Guesses from "../../components/Guesses/Guesses";
import ImageBlur from "../../components/ImageBlur/ImageBlur";
import SearchBar from "../../components/SearchBar/SearchBar";
import { getChallenge } from "../../javascript/apiCalls";
import { findGameObject } from "../../javascript/game";
import { compareGuesses, createGuess } from "../../javascript/guess";
import "./GamePage.css";

function reducer(state, action) {
  switch (action.type) {
    case "CHECK_GUESS":
      if (state.hasWon || state.guessCount == state.totalGuesses) break;
      const guess = findGameObject(action.guess, state.games);
      if (!guess) break;

      const evaluation = compareGuesses(guess, state.challenge);
      return {
        ...state,
        hasWon: Boolean(evaluation === 100),
        guessHistory: [
          ...state.guessHistory,
          createGuess(action.guess, evaluation),
        ],
      };
    case "SET_CHALLENGE":
      return {
        ...state,
        challenge: action.challenge,
        // used to reset the game
        guessHistory: [],
        hasWon: false,
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

export default function GamePage({ games, totalGuesses = 8 }) {
  const [state, dispatch] = useReducer(reducer, {
    totalGuesses: totalGuesses,
    games: games,
    guessHistory: [],
    hasWon: false,
    challenge: null,
  });

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
    dispatch({
      type: "UPDATE_PROPS",
      games: games,
      totalGuesses: totalGuesses,
    });
  }, [games, totalGuesses]);

  useEffect(() => {
    getChallenge(formatDate(formattedDate, "yyyy-MM-dd")).then((challenge) => {
      dispatch({ type: "SET_CHALLENGE", challenge: challenge });
    });
  }, [date]);

  const checkGuess = (guess) => {
    dispatch({ type: "CHECK_GUESS", guess: guess });
  };

  return (
    <Flex as="main" direction="column" id="game">
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
