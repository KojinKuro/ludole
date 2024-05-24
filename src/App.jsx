import "./App.css";
import Game from "./components/Game/Game";
import { games } from "./mockGames";

function App() {
  return (
    <>
      <header>
        <h1>LUDOLE</h1>
      </header>
      <main>
        <Game games={games} />
      </main>
      <footer>
        Coded by Brandon Doza, Charles Kwang, Gwyneth Patrick, Lydia S
      </footer>
    </>
  );
}

export default App;
