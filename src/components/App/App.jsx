import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Container } from "@chakra-ui/react";

import { getGames } from "../../javascript/apiCalls";
import AboutPage from "../../pages/AboutPage/AboutPage";
import AddGame from "../../pages/AddGamePage/AddGamePage";
import GamePage from "../../pages/GamePage/GamePage";
import MissingPage from "../../pages/MissingPage/MissingPage";
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
      <Container as="main" maxW="4xl">
        <Routes>
          <Route path="/" element={<GamePage games={games} />} />
          <Route path="/challenge/:date" element={<GamePage games={games} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/addgame"
            element={<AddGame addNewGame={addNewGame} />}
          />
          <Route path="*" element={<MissingPage />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
