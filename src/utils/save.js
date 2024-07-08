import { format, formatDate } from "date-fns";
import { getLocalDate } from "./date";

const SAVE_FILE_NAME = "save_file";

// LOADING GAME FUNCTIONS
export function loadGame() {
  const saveFileText = localStorage.getItem(SAVE_FILE_NAME);
  return JSON.parse(saveFileText);
}

export function loadGameDate(date) {
  const localDate = getLocalDate(date);
  const formattedDate = formatDate(localDate, "yyyy-MM-dd");

  const loadedGameInfo = loadGame();
  return loadedGameInfo ? loadedGameInfo[formattedDate] : null;
}

// SAVE GAME FUNCTIONS
export function saveGame(saveInformation) {
  localStorage.setItem(SAVE_FILE_NAME, JSON.stringify(saveInformation));
}

export function saveGameDate(date, saveInformation) {
  const { guessHistory, hasWon, totalGuesses } = saveInformation;
  const localDate = getLocalDate(date);
  const formattedDate = formatDate(localDate, "yyyy-MM-dd");

  saveGame({
    ...loadGame(),
    [formattedDate]: {
      guessHistory,
      hasWon,
      totalGuesses,
    },
  });
}

// RESET GAME FUNCTIONS
export function resetGame() {
  localStorage.clear();
}

/*

SAVE FILE FORMAT

{
  "2024-06-17": {
    guessHistory: [],
    hasWon: false,
    totalGuesses: 8,
  },
  "2024-06-18": {
    guessHistory: [],
    hasWon: false,
    totalGuesses: 8,
  },
}

*/
