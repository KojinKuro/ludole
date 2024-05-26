import "./InstructionPage.css"

export default function InstructionPage() {
  return (
    <main className="instructions">
      <h1> How to Play</h1>
      <div>Guess the video game in 8 tries</div>
      <ul>
        <li>Each guess must be a valid game from our database.</li>
        <li>
          The color of the will change to show how close your guess was to the
          word.
        </li>
        <li>
          Each time you guess incorrectly, the game will become less obscured.
        </li>
      </ul>
      <div>Every day at midnight a new puzzle will unlock.</div>
    </main>
  );
}
