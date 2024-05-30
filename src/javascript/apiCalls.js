function getGames(){
    return fetch('https://ludole-api.onrender.com/api/v1/game');
};

function postGame(newGame) {
  return fetch("https://ludole-api.onrender.com/api/v1/game", {
    method: "POST",
    body: JSON.stringify(newGame),
    headers: { "Content-Type": "application/json" },
  })
}

export { getGames, postGame };