import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log";

// App.jsx
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = '0';
  }
  return currentPlayer;
}

function App() {

  const [gameTurns, setGameTurns] = useState([]);

  let activePlayer = deriveActivePlayer(gameTurns);

  function handlePlayerSwitch(rowIndex, colIndex) {

    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];
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
