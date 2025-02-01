import { useState } from 'react'
import React from 'react'
import Cell from './cell'
import styles from './othello.module.css'
import { handleFlip, handleChipCount, handlePossibleMoves, handleValidMoves } from './gamelogic'

import { DEFAULTGAMESTATE, PLAYER } from './constants'
import { OthelloState, Player } from './types'
import { cloneDeep } from 'lodash'

const Othello = () => {
  const [gameState, setGameState] = useState<OthelloState>(
    cloneDeep(DEFAULTGAMESTATE)
  )

  const handleClick = (player: Player, row: number, col: number): void => {
    if (gameState.board[row][col] === '') {
      const newBoard = handleFlip(gameState.board, player, row, col)

      const [newBlackCount, newWhiteCount] = handleChipCount(newBoard)

      const newPossibleMoves = handlePossibleMoves(
        gameState.board,
        gameState.possibleMoves,
        row,
        col
      )
      console.log(newPossibleMoves, player)
      const newValidMoves = handleValidMoves(gameState, newPossibleMoves)
      console.log(newValidMoves)

      const nextPlayer = player === PLAYER.black ? PLAYER.white : PLAYER.black

      setGameState({
        ...gameState,
        board: newBoard,
        player: nextPlayer,
        chipCounts: { black: newBlackCount, white: newWhiteCount },
        possibleMoves: newPossibleMoves,
        validMoves: newValidMoves
      })
    }
  }

  const handleReset = () => {
    setGameState(cloneDeep(DEFAULTGAMESTATE))
  }

  return (
    <div>
      <div className={styles.board}>
        {gameState.board.map((rowArray, row: number) => (
          <div key={row} className={styles.rowStyle}>
            {rowArray.map((value, col: number) => (
              <Cell
                key={`${row}-${col}`}
                player={gameState.player}
                value={value}
                row={row}
                col={col}
                onClick={handleClick}
                possibleMoves={gameState.possibleMoves}
                validMoves={gameState.validMoves}
              />
            ))}
          </div>
        ))}
      </div>
      {/* implement ui for game statistics */}
      {/* implement undo funtion */}
      <div>
        <button onClick={handleReset}>Reset</button>
        Player: {gameState.player}
        Black: {gameState.chipCounts.black}
        White: {gameState.chipCounts.white}
      </div>
    </div>
  )
}

export default Othello
