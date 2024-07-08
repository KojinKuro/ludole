//basing props coming in off:
// ex: 3, 9, true
import PropTypes from "prop-types";

import { Heading } from "@chakra-ui/react";
import "./GameStatus.css";

export default function GameStatus({ numGuesses, totalGuesses, hasWon }) {
  let displayText;
  if (hasWon) {
    displayText = `Solved ${numGuesses}/${totalGuesses}`;
  } else if (numGuesses === totalGuesses) {
    displayText = "You Lose, Game Over!";
  } else {
    displayText = `Attempts ${numGuesses}/${totalGuesses}`;
  }

  return (
    <Heading textAlign="center" as="h2" size="md" className="game-status">
      {displayText}
    </Heading>
  );
}

GameStatus.propTypes = {
  numGuesses: PropTypes.number.isRequired,
  totalGuesses: PropTypes.number.isRequired,
  hasWon: PropTypes.bool.isRequired,
};
