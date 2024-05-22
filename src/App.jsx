import "./App.css";

function App() {
  return (
    <>
      <header>
        <h1>LUDOLE</h1>
      </header>
      <main>
        <img
          src="./mario.webp"
          alt="Mario game image"
          width="500px"
          height="500px"
        />
        <div className="attempt-container">Attempts component</div>
        <input type="text" placeholder="place your guess here ..." />
        <div className="guess-container">Guesses history component</div>
      </main>
      <footer>
        Coded by Brandon Doza, Charles Kwang, Gwyenth Patrick, Lydia S
      </footer>
    </>
  );
}

export default App;
