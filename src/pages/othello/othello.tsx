import { useEffect, useState } from "react";
import React from "react";
import Cell from "./cell/cell";
import styles from "./othello.module.css"
import {
  handleFlipDirections,
  handleChipCount
} from "./gamelogic/gamelogic"

interface OthelloState {
  board: string[][];
  player: 'B' | 'W' | 'V' | '';
  blackChipCount: number;
  whiteChipCount: number;
}

const Othello = () => {
  const initialBoard = Array.from({ length: 8 }, () => Array(8).fill(''))
  initialBoard[4][4] = 'B';
  initialBoard[3][3] = 'B';
  initialBoard[4][3] = 'W';
  initialBoard[3][4] = 'W';
  const [gameState, setGameState] = useState<OthelloState>({
    board: initialBoard,
    player: 'B',
    blackChipCount: 2,
    whiteChipCount: 2
  })

  const handleClick = (player: string, row: number, col: number): void => {
    if (gameState.board[row][col] === '') {
      const newBoard = [...gameState.board]
      const nextPlayer = player === 'B' ? 'W' : 'B';
      newBoard[row][col] = player

      handleFlipDirections(player, newBoard, row, col)

      const [newBlackCount, newWhiteCount] = handleChipCount(newBoard)
      
      setGameState({
        ...gameState,
        board: newBoard,
        player: nextPlayer,
        blackChipCount: newBlackCount,
        whiteChipCount: newWhiteCount
      })
    }
  }

  const handleReset = () => {
    setGameState({
      ...gameState,
      board: initialBoard,
      player: 'B',
      blackChipCount: 2,
      whiteChipCount: 2
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
      Black: {gameState.blackChipCount}
      White: {gameState.whiteChipCount}
    </div>
  );
};

export default Othello;