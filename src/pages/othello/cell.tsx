import React from "react";
import styles from "./cell.module.css";

interface CellProps {
  player: string; // 'B' for black, 'W' for white, or empty string
  value: string;
  row: number;
  col: number;
  handleClick: (player: string, row: number, col: number) => void;
}

const Cell: React.FC<CellProps> = ({ player, value, row, col, handleClick: handleFlip }) => {
  const pieceClass = 
  value === 'B' ? styles.black : 
  value === 'W' ? styles.white : 
  '';

  return (
    <div className={styles.cell} key={`${player}-${row}-${col}`} onClick={() => handleFlip(player, row, col)}>
      <div className={pieceClass} />
    </div>
  );
};

export default Cell;