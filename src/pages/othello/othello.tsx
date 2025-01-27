import { useEffect, useState } from "react";
import React from "react";
import Cell from "./cell/cell";
import styles from "./othello.module.css"

interface OthelloState {
  board: string[][];
  player: 'B' | 'W' | 'V' | '';
}

const Othello = () => {
  const initialBoard = Array.from({ length: 8 }, () => Array(8).fill(''))
  initialBoard[4][4] = 'B';
  initialBoard[3][3] = 'B';
  initialBoard[4][3] = 'W';
  initialBoard[3][4] = 'W';
  const [gameState, setGameState] = useState<OthelloState>({
    board: initialBoard,
    player: 'B'
  })

  useEffect(() => {
    const initialBoard: string[][] = [
      ...gameState.board,
    ];
    initialBoard[4][4] = 'B';
    initialBoard[3][3] = 'B';
    initialBoard[4][3] = 'W';
    initialBoard[3][4] = 'W';
    setGameState({ ...gameState, board: initialBoard });
  }, []);

  const handleFlip = (player: string, row: number, col: number): void => {
    if (gameState.board[row][col] == '') {
      const newBoard = [...gameState.board]
      const nextPlayer = player == 'B' ? 'W' : 'B';
      newBoard[row][col] = player
      
      setGameState({
        ...gameState,
        board: newBoard,
        player: nextPlayer
      })
    }
  }

  const handleReset = () => {
    setGameState({
      board: initialBoard,
      player: 'B'
    })
  }


  return (
    <div>
      <div className={styles.board}>
        {gameState.board.map((rowArray, row: number) => (
          <div key={row} className={styles.rowStyle}> 
            {rowArray.map((value, col: number) => (
              <Cell key={`${row}-${col}`} player={gameState.player} value={value} row={row} col={col} handleFlip={handleFlip}/> 
            ))}
          </div>
        ))}
      </div>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Othello;