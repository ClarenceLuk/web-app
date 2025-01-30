import { useState } from 'react'
import React from 'react'
import Cell from './cell'
import styles from './othello.module.css'
import { handleFlipDirections, handleChipCount } from './gamelogic'

import { DEFAULTGAMESTATE } from './constants'
import { OthelloState } from './types'
import _ from 'lodash';

const Othello = () => {
  const [gameState, setGameState] = useState<OthelloState>(_.cloneDeep(DEFAULTGAMESTATE))

  const handleClick = (player: string, row: number, col: number): void => {
    if (gameState.board[row][col] === '') {
      const newBoard = [...gameState.board]

      // implement player turn validation and valid placement
      const nextPlayer = player === 'black' ? 'white' : 'black'

      handleFlipDirections(player, newBoard, row, col)

      const [newBlackCount, newWhiteCount] = handleChipCount(newBoard)

      setGameState({
        ...gameState,
        board: newBoard,
        player: nextPlayer,
        chipCounts: { black: newBlackCount, white: newWhiteCount },
      })
    }
  }

  const handleReset = () => {
    setGameState(_.cloneDeep(DEFAULTGAMESTATE))
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
