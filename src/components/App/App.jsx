import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";

import { getGames } from "../../javascript/apiCalls";
import AboutPage from "../../pages/AboutPage";
import GamePage from "../../pages/GamePage";
import InstructionPage from "../../pages/InstructionPage";
import AddGame from "../AddGame/AddGame";
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
      <header>
        <Link to="/" className="logo">
          <box-icon color="white" type="solid" name="invader" size="md" />
          <h1>LUDOLE</h1>
        </Link>
        <nav>
          <NavLink to="/about">
            <box-icon color="black" name="info-circle" />
          </NavLink>
          <NavLink to="/howto">
            <box-icon color="black" type="solid" name="help-circle" />
          </NavLink>
          <NavLink to="/addgame">
            <box-icon color="black" type="solid" name="add-to-queue"></box-icon>
          </NavLink>
        </nav>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            loadSuccess ? (
              <GamePage games={games} />
            ) : (
              <div>{`${statusMessage}`}</div>
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
              <div>{`${statusMessage}`}</div>
            )
          }
        />
        <Route
          path="*"
          element={
            loadSuccess ? (
              <GamePage games={games} />
            ) : (
              <div>{`${statusMessage}`}</div>
            )
          }
        />
      </Routes>
      <footer>
        Coded by Brandon Doza, Charles Kwang, Gwyneth Patrick, Lydia Sims.
      </footer>
    </>
  );
}

export default App;
