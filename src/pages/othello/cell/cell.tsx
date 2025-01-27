import React from "react";
import styles from "./cell.module.css";

interface CellProps {
  value: string; // 'B' for black, 'W' for white, or empty string
  row: number;
  col: number;
}

const Cell: React.FC<CellProps> = ({ value, row, col }) => {
  const pieceClass = React.useMemo(() => {
    switch (value) {
      case "B":
        return styles.black;
      case "W":
        return styles.white;
      case "V":
        return styles.valid;
      default:
        return "";
    }
  }, [value]); // Recalculate only when value changes

  return (
    <div className={styles.cell} key={`${value}-${row}-${col}`}>
      <div className={pieceClass} />
    </div>
  );
};

export default Cell;