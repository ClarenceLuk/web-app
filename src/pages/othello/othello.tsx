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
  handleWinningCondition,
} from './gamelogic'

import { DEFAULTGAMESTATE, PLAYER } from './constants'
import { OthelloState, Player } from './types'
import { cloneDeep } from 'lodash'
import { Box } from '@mui/material'
import GameModal from './gameModal'
import GameStats from './gameStats'

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

      const newChipCount = handleChipCount(newBoard)

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

      const newWinningCondition = handleWinningCondition(newChipCount)

      setGameState({
        ...gameState,
        board: newBoard,
        player: nextPlayer,
        chipCounts: newChipCount,
        possibleMoves: newPossibleMoves,
        validMoves: newValidMoves,
        openModal: newWinningCondition,
      })
    }
  }

  const handleReset = () => {
    setGameState(cloneDeep(DEFAULTGAMESTATE))
  }

  return (
    <Box>
      <GameModal
        handleReset={handleReset}
        setGameState={setGameState}
        gameState={gameState}
      />
      <Box className={styles.board}>
        {gameState.board.map((rowArray, row: number) => (
          <Box key={row} className={styles.rowStyle}>
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
          </Box>
        ))}
      </Box>
      {/* TODO: implement ui component for game statistics */}
      {/* TODO: implement ui component for undo funtion */}
      <GameStats
        gameState={gameState}
        handleReset={handleReset}
      />
    </Box>
  )
}

export default Othello
