import { useState } from "react";
import React from "react";
import Cell from "./cell";
import styles from "./othello.module.css"
import {
  handleFlipDirections,
  handleChipCount
} from "./gamelogic"

import {INITIALBOARD} from "./constants"

interface OthelloState {
  board: string[][];
  player: 'B' | 'W';
  chipCounts: { black: number; white: number }
}

const Othello = () => {
  const [gameState, setGameState] = useState<OthelloState>({
    board: INITIALBOARD,
    player: 'B',
    chipCounts: { black: 2, white: 2 }
  })

  const handleClick = (player: string, row: number, col: number): void => {
    if (gameState.board[row][col] === '') {
      const newBoard = [...gameState.board]

      // implement player turn validation and valid placement
      const nextPlayer = player === 'B' ? 'W' : 'B';

      handleFlipDirections(player, newBoard, row, col)

      const [newBlackCount, newWhiteCount] = handleChipCount(newBoard)
      
      setGameState({
        ...gameState,
        board: newBoard,
        player: nextPlayer,
        chipCounts: { black: newBlackCount, white: newWhiteCount }
      })
    }
  }

  const handleReset = () => {
    setGameState({
      ...gameState,
      board: INITIALBOARD,
      player: 'B',
      chipCounts: { black: 2, white: 2 }
    })
  }


  return (
    <div>
      <div className={styles.board}>
        {gameState.board.map((rowArray, row: number) => (
          <div key={row} className={styles.rowStyle}> 
            {rowArray.map((value, col: number) => (
              <Cell key={`${row}-${col}`} player={gameState.player} value={value} row={row} col={col} handleClick={handleClick}/> 
            ))}
          </div>
        ))}
      </div>
      <button onClick={handleReset}>Reset</button>
      Player: {gameState.player}
      Black: {gameState.chipCounts.black}
      White: {gameState.chipCounts.white}
    </div>
  );
};

export default Othello;