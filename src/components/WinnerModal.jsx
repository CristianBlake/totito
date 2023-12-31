import { Square } from "./Square"

export function WinnerModal ({ winner, resetGame }) {
  if (winner === null) return null

  const gameResultText = winner === false ? 'Draw' : 'Won'

  return (
    <section className="winner">
      <div className="text">
        <h2>{gameResultText}</h2>

        <header className="win">
          {winner && <Square>{winner}</Square>}
        </header>

        <footer>
          <button onClick={resetGame}>
              New game
          </button>
        </footer>
      </div>
    </section>
  )
}