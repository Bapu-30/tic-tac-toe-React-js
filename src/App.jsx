import Player from "./components/Player"
import GameOver from "./components/gameOver";
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning_combinations";

// Initial game board state
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// Managing the active player state with respect to the gameTurns state
function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;

}

// Function for deriving/updating the game board array data
function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map((innerArray) => [...innerArray])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard
}

// Function for calculating the winner
function deriveWinner(gameBoard, playerNames) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol) {
      winner = playerNames[firstSquareSymbol];
    }

  }
  return winner

}

function App() {

  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState({
    X: 'Player-1',
    O: 'Player-2'
  })

  // Function for handling the switching of players. returns row and col index of the current player
  function handlePlayerSwitch(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];
      return updatedTurns
    })
  }

  // Function for handling the player names which gets passed onto the <Player/> component
  function handlePlayerNames(symbol, name) {
    setPlayerNames(prev => { return { ...prev, [symbol]: name } })
  }

  // Function for handling the rematch behaviour
  function handleRematch() {
    setGameTurns([]);
  }


  const gameBoard = deriveGameBoard(gameTurns);
  let activePlayer = deriveActivePlayer(gameTurns);
  const winner = deriveWinner(gameBoard, playerNames);
  const isDraw = gameTurns.length === 9 && !winner;

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={ "Player-1" } symbol={ "X" } isActive={ activePlayer === 'X' } setName={ handlePlayerNames } />
          <Player name={ "Player-2" } symbol={ "O" } isActive={ activePlayer === 'O' } setName={ handlePlayerNames } />
        </ol>
        { (winner || isDraw) && <GameOver winner={ winner } onRestart={ handleRematch } /> }
        <GameBoard onSelectSquare={ handlePlayerSwitch } board={ gameBoard } />

      </div>
      <Log data={ gameTurns } />
    </main>
  )
}

export default App
