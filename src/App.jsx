import { useState } from "react"
import confetti from 'canvas-confetti'

import { Square } from "./components/Square"
import { WinnerModal } from "./components/WinnerModal.jsx";

import { TURNS } from './constants.js';
import { checkWinnerFrom, checkEndGame } from './logic/boards.js';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null) //null = not winner, false = draw, true = winner

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className="board">
      <h1>totito</h1>
      <button onClick={resetGame}>Reset game</button>
      <section className="game">
        {
          board.map((square, index) => (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>    
            )
          )
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
