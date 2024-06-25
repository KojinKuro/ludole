import { format } from "date-fns";

const SAVE_FILE_NAME = "save_file";

function loadGame() {
  const saveFileText = localStorage.loadGame(SAVE_FILE_NAME);
  return JSON.parse(saveFileText);
}

function saveGame(saveInformation) {
  localStorage.setItem(SAVE_FILE_NAME, JSON.stringify(saveInformation));
}

function saveGameDate(date, saveInformation) {
  const { guessHistory, hasWon } = saveInformation;
  saveGame({ ...loadGame() });
}

function resetGame() {
  localStorage.clear();
}

/*

{
  "2024-06-17": {
    guessHistory: [],
    hasWon: false,
  },
  "2024-06-18": {
    guessHistory: [],
    hasWon: false,
  },
}

*/
