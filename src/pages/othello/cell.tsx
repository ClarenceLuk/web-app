import React from 'react'
import styles from './cell.module.css'
import { Player, PossibleMoves } from './types'

interface CellProps {
  player: Player // 'B' for black, 'W' for white, or empty string
  value: string
  row: number
  col: number
  onClick: (player: Player, row: number, col: number) => void
  possibleMoves: PossibleMoves
}

const Cell: React.FC<CellProps> = ({
  player,
  value,
  row,
  col,
  onClick: handleFlip,
  possibleMoves
}) => {
  const pieceClass =
    value === 'black' ? styles.black : value === 'white' ? styles.white : ''
  if (`${row},${col}` in possibleMoves) {
    return (
      <div
        className={styles.possibleCell}
        key={`${player}-${row}-${col}`}
        onClick={() => handleFlip(player, row, col)}>
        <div className={pieceClass} />
    </div>
    )
  }
  return (
    <div
      className={styles.cell}
      key={`${player}-${row}-${col}`}
      onClick={() => handleFlip(player, row, col)}>
      <div className={pieceClass} />
    </div>
  )
}

export default Cell
