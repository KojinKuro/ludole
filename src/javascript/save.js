const SAVE_FILE_NAME = "save_file";

function loadGame() {
  const saveFileText = localStorage.loadGame(SAVE_FILE_NAME);
  return JSON.parse(saveFileText);
}

function saveGame(information) {
  localStorage.setItem(SAVE_FILE_NAME, JSON.stringify(information));
}

function resetGame() {
  localStorage.clear();
}

/*

{
  "2024-06-17": {
    guessCount: 0,
    guessHistory: [],
    hasWon: false,
  },
  "2024-06-18": {
    guessCount: 0,
    guessHistory: [],
    hasWon: false,
  },
}

*/
