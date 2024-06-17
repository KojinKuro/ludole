import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { formatDate } from "date-fns";
import { getChallenge, getGames } from "../../javascript/apiCalls";
import AboutPage from "../../pages/AboutPage/AboutPage";
import GamePage from "../../pages/GamePage/GamePage";
import MissingPage from "../../pages/MissingPage/MissingPage";
import AddGame from "../AddGame/AddGame";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./App.css";

function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames().then(setGames).catch(console.error);
  }, []);

  function addNewGame(newGame) {
    setGames([...games, newGame]);
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<GamePage games={games} />} />
        <Route path="/challenge/:date" element={<GamePage games={games} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/addgame" element={<AddGame addNewGame={addNewGame} />} />
        <Route path="*" element={<MissingPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
