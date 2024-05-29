import { Link, NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import { games } from "./mockGames";
import AboutPage from "./pages/AboutPage";
import GamePage from "./pages/GamePage";
import InstructionPage from "./pages/InstructionPage";
import AddGame from "./components/AddGame/AddGame";

function App() {
  // state for all games will live here. Setter function will need to be passed
  // to AddGames component 
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
            <box-icon color="black" type='solid' name='add-to-queue'></box-icon>
          </NavLink>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<GamePage games={games} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/howto" element={<InstructionPage />} />
        <Route path="/addgame" element={<AddGame />} />
        <Route path="*" element={<GamePage games={games} />} />
      </Routes>
      <footer>
        Coded by Brandon Doza, Charles Kwang, Gwyneth Patrick, Lydia S
      </footer>
    </>
  );
}

export default App;
