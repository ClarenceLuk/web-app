import React, { useState } from 'react'
import styles from './othello.module.css'

export type Player = 'B' | 'W' | null

const BOARD_SIZE = 8

// Initialize the board with starting pieces
const initializeBoard = (): Player[][] => {
  const board: Player[][] = Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(null))
  board[3][3] = 'W'
  board[4][4] = 'W'
  board[3][4] = 'B'
  board[4][3] = 'B'
  return board
}

const Othello: React.FC = () => {
  const [board, setBoard] = useState<Player[][]>(initializeBoard)
  const [currentPlayer, setCurrentPlayer] = useState<Player>('B')

  // Function to handle cell click (to place a piece)
  const handleClick = (row: number, col: number) => {
    if (board[row][col] === null) {
      const newBoard = board.map((arr) => arr.slice()) // Create a copy of the board
      newBoard[row][col] = currentPlayer // Set the new move
      setBoard(newBoard)
      setCurrentPlayer(currentPlayer === 'B' ? 'W' : 'B') // Switch player
    }
  }

  return (
    <div className={styles.game}>
      <div className={styles.board}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`${styles.cell} ${cell === 'B' ? styles.black : cell === 'W' ? styles.white : styles.cell}`}
              onClick={() => handleClick(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
      <p>Current Player: {currentPlayer}</p>
    </div>
  )
}

export default Othello
