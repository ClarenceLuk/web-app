import { Player } from './othello'

const isValidMove = (
  board: Player[][],
  row: number,
  col: number,
  player: Player
): boolean => {
  const BOARD_SIZE = 8
  // Ensure the cell is empty
  if (board[row][col] !== null) return false

  // Directions to check for flips (horizontal, vertical, diagonal)
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ]

  const opponent = player === 'B' ? 'W' : 'B'
  let valid = false

  // Check in all directions for valid move
  for (const [dx, dy] of directions) {
    let x = row + dx
    let y = col + dy
    let hasOpponent = false

    while (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
      if (board[x][y] === opponent) {
        hasOpponent = true
      } else if (board[x][y] === player && hasOpponent) {
        valid = true
        break
      } else {
        break
      }
      x += dx
      y += dy
    }

    if (valid) break
  }

  return valid
}

export default isValidMove
