import {
  Box,
  Button,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
Chart.register(CategoryScale, BarController, BarElement, LinearScale);

import { useNavigate } from "react-router";
import { loadGame, resetGame } from "../../../javascript/save";

export default function StatsModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const saveData = loadGame();
  const gameStats = Object.keys(saveData || {}).reduce(
    (gameStats, date) => {
      const { hasWon, guessHistory, totalGuesses } = saveData[date];
      const guessCount = guessHistory.length;
      const gameCompleted = Boolean(hasWon || guessCount === totalGuesses);

      while (guessCount > gameStats.guessData.length) {
        gameStats.guessData.push(0);
      }

      if (gameCompleted) gameStats.guessData[guessCount - 1] += 1;

      return {
        gamesPlayed: gameCompleted
          ? gameStats.gamesPlayed + 1
          : gameStats.gamesPlayed,
        gamesWon: hasWon ? gameStats.gamesWon + 1 : gameStats.gamesWon,
        guessData: gameStats.guessData,
        maxTotalGuesses:
          totalGuesses > gameStats.maxTotalGuesses
            ? totalGuesses
            : gameStats.maxTotalGuesses,
      };
    },
    {
      gamesPlayed: 0,
      gamesWon: 0,
      guessData: [],
      maxTotalGuesses: 0,
    }
  );

  while (gameStats.guessData.length < gameStats.maxTotalGuesses) {
    gameStats.guessData.push(0);
  }

  const myData = {
    labels: Object.keys(gameStats.guessData).map((val) => {
      return parseInt(val) + 1;
    }),
    datasets: [
      {
        label: "Guess Distribution",
        data: gameStats.guessData,
      },
    ],
  };

  const resetStats = () => {
    resetGame();
    onClose();
    navigate(0);
  };

  return (
    <>
      <IconButton
        aria-label="Open statistics page"
        onClick={onOpen}
        variant="ghost"
        icon={<box-icon name="stats" />}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Stats</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column">
              <Box>Games Played{gameStats.gamesPlayed}</Box>
              <Box>
                Win percentage
                {Math.trunc((gameStats.gamesWon / gameStats.gamesPlayed) * 100)}
                %
              </Box>
              <Bar
                options={{ indexAxis: "y", responsive: true }}
                data={myData}
              />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={resetStats}>
              Reset Stats
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
