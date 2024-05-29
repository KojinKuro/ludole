import { Link, NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import AboutPage from "./pages/AboutPage";
import GamePage from "./pages/GamePage";
import InstructionPage from "./pages/InstructionPage";
import { useEffect, useState } from "react";
import { getGames } from "./javascript/apiCalls";

function App() {
  const [games, setGames] = useState([])
  const [loadSuccess, setLoadSuccess] = useState(false)
  const [statusMessage, setStatusMessage] = useState('Loading...')
  function loadGames(){
    getGames().then((r)=>{
    return r.json()
    })
    .then((data)=>{
      setGames(data)
      setLoadSuccess(true)
    });
  };
  useEffect(()=>{
    loadGames();
  },[]);
  return (
    <>
      <header>
        <Link to="/" className="logo">
          <box-icon color="white" type="solid" name="invader" size="md" />
          <h1>LUDOLE</h1>
        </Link>
        <nav>
          {/* <box-icon color="white" type="solid" name="calendar" />
          <box-icon color="white" name="bar-chart-alt-2" type="solid" /> */}
          <NavLink to="/about">
            <box-icon color="black" name="info-circle" />
          </NavLink>
          <NavLink to="/howto">
            <box-icon color="black" type="solid" name="help-circle" />
          </NavLink>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={loadSuccess?<GamePage games={games} />:<div>{`${statusMessage}`}</div>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/howto" element={<InstructionPage />} />
        <Route path="*" element={<GamePage games={games} />} />
      </Routes>
      <footer>
        Coded by Brandon Doza, Charles Kwang, Gwyneth Patrick, Lydia S
      </footer>
    </>
  );
}

export default App;
