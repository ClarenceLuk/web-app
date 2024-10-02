import isValidMove from './gamelogic'
import { Player } from './othello'

const getRandomMove = (
  board: Player[][],
  player: Player
): [number, number] | null => {
  const validMoves: [number, number][] = []
  const BOARD_SIZE = 8
  // Check every cell for a valid move
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (isValidMove(board, row, col, player)) {
        validMoves.push([row, col])
      }
    }
  }

  if (validMoves.length > 0) {
    const randomIndex = Math.floor(Math.random() * validMoves.length)
    return validMoves[randomIndex]
  }

  return null
}
