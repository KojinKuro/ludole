import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { getGames } from "../../javascript/apiCalls";
import AboutPage from "../../pages/AboutPage";
import GamePage from "../../pages/GamePage";
import InstructionPage from "../../pages/InstructionPage";
import AddGame from "../AddGame/AddGame";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./App.css";

function App() {
  const [games, setGames] = useState([]);
  const [loadSuccess, setLoadSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Loading...");
  function loadGames() {
    getGames()
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw new Error(
            "Oops, something went wrong! Please reload the page."
          );
        }
      })
      .then((data) => {
        setGames(data);
        setLoadSuccess(true);
      })
      .catch((error) => {
        console.error(error);
        setStatusMessage(String(error));
      });
  }
  useEffect(() => {
    loadGames();
  }, []);

  function addNewGame(newGame) {
    setGames([...games, newGame]);
  }

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            loadSuccess ? (
              <GamePage games={games} />
            ) : (
              <main>{`${statusMessage}`}</main>
            )
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/howto" element={<InstructionPage />} />
        <Route path="/addgame" element={<AddGame addNewGame={addNewGame} />} />
        <Route
          path="/testing"
          element={
            loadSuccess ? (
              <GamePage games={games} answerIndex={3} />
            ) : (
              <main>{`${statusMessage}`}</main>
            )
          }
        />
        <Route
          path="*"
          element={
            loadSuccess ? (
              <GamePage games={games} />
            ) : (
              <main>{`${statusMessage}`}</main>
            )
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
