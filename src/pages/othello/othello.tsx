import { useState } from 'react'
import React from 'react'
import Cell from './cell'
import styles from './othello.module.css'
import cellStyles from './cell.module.css'
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
import { Box, Button, Typography } from '@mui/material'
import GameModal from './gameModal'

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
      {/* TODO: implement ui for game statistics */}
      {/* TODO: implement undo funtion */}
      <Box className={styles.gameUI}>
        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>
        <Box style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
          <Typography variant="subtitle2">Turn:</Typography>
          <Box className={cellStyles[gameState.player]} />
        </Box>
        <Typography variant="subtitle2">
          Black: {gameState.chipCounts.black}
        </Typography>
        <Typography variant="subtitle2">
          White: {gameState.chipCounts.white}
        </Typography>
      </Box>
    </Box>
  )
}

export default Othello
