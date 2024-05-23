//basing props coming in off:
// ex: 3, 9, true

import "./GameStatus.css"

export default function GameStatus({numGuesses, totalGuesses, hasWon}) {
    const getDisplay = ()=> {
        if (hasWon) {
            return <h2>{`Solved ${numGuesses}/${totalGuesses}`}</h2>
        } else if (numGuesses === 9) {
            return <h2>You Lose, Game Over!</h2>
        } else {
            return <h2>{`Attempts ${numGuesses}/${totalGuesses}`}</h2>
        }
    }
    return (
        <div className="gameStatus">
            {getDisplay()}
        </div>
    )
}