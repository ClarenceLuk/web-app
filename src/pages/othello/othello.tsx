import React from "react";
import Cell from "./cell/cell";
import styles from "./othello.module.css"

const Othello = () => {
  const board: string[][] = Array.from({ length: 8 }, () => Array(8).fill(''));
  board[4][4] = 'B'
  board[3][3] = 'B'
  board[4][3] = 'W'
  board[3][4] = 'W'

  return (
    <div className={styles.board}>
      {board.map((rowArray, row: number) => (
        <div key={row} className={styles.rowStyle}> 
          {rowArray.map((value, col: number) => (
            <Cell key={`${row}-${col}`} value={value} row={row} col={col} /> 
          ))}
        </div>
      ))}
    </div>
  );
};

export default Othello;