import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log";

// App.jsx
function App() {

  const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);

  function handlePlayerSwitch(rowIndex, colIndex) {
    setActivePlayer((currentPlayer) =>
      currentPlayer === 'X' ? 'O' : 'X'
    )

    setGameTurns((prevTurns) => {

      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: activePlayer }, ...prevTurns];
      return updatedTurns
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={ "Player-1" } symbol={ "X" } isActive={ activePlayer === 'X' } />
          <Player name={ "Player-2" } symbol={ "O" } isActive={ activePlayer === 'O' } />
        </ol>
        <GameBoard onSelectSquare={ handlePlayerSwitch } turns={ gameTurns } />
      </div>
      <Log data={ gameTurns } />
    </main>
  )
}

export default App
