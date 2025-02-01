import { useState } from 'react'
import React from 'react'
import Cell from './cell'
import styles from './othello.module.css'
import {
  handleFlip,
  handleChipCount,
  handlePossibleMoves,
  handleValidMoves,
  handlePlayerTurn,
} from './gamelogic'

import { DEFAULTGAMESTATE, PLAYER } from './constants'
import { OthelloState, Player } from './types'
import { cloneDeep } from 'lodash'

const Othello = () => {
  const [gameState, setGameState] = useState<OthelloState>(
    cloneDeep(DEFAULTGAMESTATE)
  )

  const handleClick = (player: Player, row: number, col: number): void => {
    if (
      gameState.board[row][col] === '' &&
      `${row},${col}` in gameState.validMoves[player]
    ) {
      const newBoard = handleFlip(gameState.board, player, row, col)

      const [newBlackCount, newWhiteCount] = handleChipCount(newBoard)

      const newPossibleMoves = handlePossibleMoves(
        gameState.board,
        gameState.possibleMoves,
        row,
        col
      )
      const newValidMoves = handleValidMoves(newBoard, newPossibleMoves)

      const nextPlayer = handlePlayerTurn(
        newValidMoves,
        player,
        player === PLAYER.black ? PLAYER.white : PLAYER.black
      )

      setGameState({
        ...gameState,
        board: newBoard,
        player: nextPlayer,
        chipCounts: { black: newBlackCount, white: newWhiteCount },
        possibleMoves: newPossibleMoves,
        validMoves: newValidMoves,
      })
    }
    //TODO: handle win condition and add ui component for win
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
                validMoves={gameState.validMoves}
              />
            ))}
          </div>
        ))}
      </div>
      {/* TODO: implement ui for game statistics */}
      {/* TODO: implement undo funtion */}
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
