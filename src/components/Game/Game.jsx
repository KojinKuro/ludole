import Guesses from "../Guesses/Guesses";
import ImageBlur from "../ImageBlur/ImageBlur";
import "./Game.css";

function Game() {
  return (
    <main id="game">
      <ImageBlur
        width="500px"
        height="500px"
        src="./mario.webp"
        alt="Mario game image"
        blur={100}
      />
      <div className="attempt-container">Attempts component</div>
      <input type="text" placeholder="place your guess here ..." />
      <Guesses guessArray={[["sword", 1]]} />
    </main>
  );
}

export default Game;
