function getGames() {
  return fetch("http://localhost:8000/api/v1/game");
}

function postGame(newGame) {
  return fetch("http://localhost:8000/api/v1/game", {
    method: "POST",
    body: JSON.stringify(newGame),
    headers: { "Content-Type": "application/json" },
  })
}

export { getGames, postGame };
