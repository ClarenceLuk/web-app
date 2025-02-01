import React from 'react'
import styles from './cell.module.css'
import { Player, PossibleMoves, ValidMoves } from './types'

interface CellProps {
  player: Player // 'B' for black, 'W' for white, or empty string
  value: string
  row: number
  col: number
  onClick: (player: Player, row: number, col: number) => void
  possibleMoves: PossibleMoves
  validMoves: ValidMoves
}

const Cell: React.FC<CellProps> = ({
  player,
  value,
  row,
  col,
  onClick: handleFlip,
  possibleMoves,
  validMoves,
}) => {
  if (`${row},${col}` in validMoves[player]) {
    return (
      <div
        className={styles.cell}
        key={`${player}-${row}-${col}`}
        onClick={() => handleFlip(player, row, col)}>
        <div className={styles.valid} />
      </div>
    )
  }
  return (
    <div
      className={styles.cell}
      key={`${player}-${row}-${col}`}
      onClick={() => handleFlip(player, row, col)}>
      <div className={styles[value]} />
    </div>
  )
}

export default Cell
