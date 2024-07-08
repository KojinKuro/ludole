const API_URL = "https://ludole-api.vercel.app";
// const API_URL = "http://localhost:8000";

function getGames() {
  return fetch(`${API_URL}/api/v1/game`).then((r) => {
    if (!r.ok) {
      throw new Error("Failed to grab games. Try again.");
    } else {
      return r.json();
    }
  });
}

// date is a string with the syntax: YYYY-MM-DD
function getChallenge(date) {
  return fetch(`${API_URL}/api/v1/challenge/${date}`).then((r) => {
    if (!r.ok) {
      throw new Error("Error grabbing challenge.");
    } else {
      return r.json();
    }
  });
}

function postGame(newGame) {
  return fetch(`${API_URL}/api/v1/game`, {
    method: "POST",
    body: JSON.stringify(newGame),
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to post.");
    } else {
      return res.json();
    }
  });
}

export { getChallenge, getGames, postGame };
