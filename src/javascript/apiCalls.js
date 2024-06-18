const API_URL = "https://ludole-api.onrender.com";

function getGames() {
  return fetch(`${API_URL}/api/v1/game`).then((r) => {
    if (!r.ok) {
      throw new Error("Oops, something went wrong! Please reload the page.");
    }

    return r.json();
  });
}

// date is a string with the syntax: YYYY-MM-DD
function getChallenge(date) {
  return fetch(`${API_URL}/api/v1/challenge/${date}`).then((r) => {
    if (!r.ok) {
      throw new Error("Error grabbing challenge.");
    }

    return r.json();
  });
}

function postGame(newGame) {
  return fetch(`${API_URL}/api/v1/game`, {
    method: "POST",
    body: JSON.stringify(newGame),
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    if (res.ok) {
      document.getElementById("success").innerText =
        "Game Successfully Submitted";
      return res.json();
    } else {
      throw new Error("Oops, something went wrong!");
    }
  });
}

export { getChallenge, getGames, postGame };
