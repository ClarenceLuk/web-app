import React from "react";
import styles from "./cell.module.css";

interface CellProps {
  value: string; 
  row: number;
  col: number;
}


const Cell: React.FC<CellProps> = ({ value, row, col }) => {
  return <div className={styles.cell} />
}

export default Cell;
