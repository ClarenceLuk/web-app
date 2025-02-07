import { Box, Button, Typography } from "@mui/material";
import React from "react";
import styles from './gameStats.module.css'
import { OthelloState } from "./types";
import cellStyles from './cell.module.css'

interface GameStatsProps {
  gameState: OthelloState
  handleReset: () => void
}

const GameStats = ({gameState, handleReset}: GameStatsProps) => {
  return (
  <Box className={styles.gameUI}>
    <Button variant="outlined" onClick={handleReset}>
      Reset
    </Button>
    <Box className={styles.turn}>
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
)}

export default GameStats