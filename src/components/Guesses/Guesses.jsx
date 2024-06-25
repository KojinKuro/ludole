import { Container, SimpleGrid } from "@chakra-ui/react";
import PropTypes from "prop-types";
import "./Guesses.css";

function calculateBackgroundColor(number) {
  if (number < 0) {
    return "#808080";
  } else if (number <= 25) {
    return "#FF4400";
  } else if (number <= 50) {
    return "#FFFF00";
  } else if (number <= 75) {
    return "#88FF00";
  } else if (number < 100) {
    return "#44FF00";
  } else if (number == 100) {
    return "#00FF00";
  } else {
    return "#808080";
  }
}

//basing this off data from guessArray coming in to be ['guess string', '25' - 25 being the percentage correct] - Hopefully that works

export default function Guesses({ totalGuesses = 8, guessArray = [] }) {
  const MAX_GUESSES = totalGuesses;
  if (guessArray.length > MAX_GUESSES) return;

  const emptyBoxNumber = MAX_GUESSES - guessArray.length;
  const boxes = [...guessArray, ...Array(emptyBoxNumber).fill(["", -1])];

  const boxElements = boxes.map((box, index) => {
    const [guess, number] = box;

    return (
      <Container
        height={7}
        border="1px solid black"
        key={index}
        noOfLines={1}
        backgroundColor={calculateBackgroundColor(parseInt(number))}
      >
        {guess}
      </Container>
    );
  });

  return (
    <SimpleGrid width="100%" columns={{ base: 1, md: 2 }} spacing={2}>
      {boxElements}
    </SimpleGrid>
  );
}

Guesses.propTypes = {
  totalGuesses: PropTypes.number,
  guessArray: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
  ),
};
