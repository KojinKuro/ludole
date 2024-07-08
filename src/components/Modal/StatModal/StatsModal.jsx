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
import { loadGame, resetGame } from "../../../utils/save";

export default function StatsModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const saveData = loadGame();
  const gameStats = Object.keys(saveData || {}).reduce(
    (gameStats, date) => {
      const { hasWon, guessHistory, totalGuesses } = saveData[date];
      const { gamesWon, gamesPlayed, maxGuesses, guessData } = gameStats;
      const guessCount = guessHistory.length;
      const gameCompleted = Boolean(hasWon || guessCount === totalGuesses);

      while (guessCount > guessData.length) guessData.push(0);
      if (gameCompleted) guessData[guessCount - 1] += 1;

      return {
        gamesPlayed: gameCompleted ? gamesPlayed + 1 : gamesPlayed,
        gamesWon: hasWon ? gamesWon + 1 : gamesWon,
        guessData: guessData,
        maxGuesses: totalGuesses > maxGuesses ? totalGuesses : maxGuesses,
      };
    },
    {
      gamesPlayed: 0,
      gamesWon: 0,
      guessData: [],
      maxGuesses: 0,
    }
  );

  while (gameStats.guessData.length < gameStats.maxGuesses) {
    gameStats.guessData.push(0);
  }

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
                data={{
                  labels: Object.keys(gameStats.guessData).map(
                    (val) => parseInt(val) + 1
                  ),
                  datasets: [
                    {
                      label: "Guess Distribution",
                      data: gameStats.guessData,
                    },
                  ],
                }}
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
