import { DIRECTIONS } from './constants'

const handleFlipDirections = (
  player: string,
  board: string[][],
  row: number,
  col: number
) => {
  board[row][col] = player

  for (const direction of DIRECTIONS) {
    if (row >= 0 && row < 8 && col >= 0 && col < 8 && board[row][col] !== '') {
      flip(player, board, row + direction[0], col + direction[1], direction)
    }
  }
}

const flip = (
  player: string,
  board: string[][],
  row: number,
  col: number,
  direction: number[]
): boolean => {
  if (row < 0 || row >= 8 || col < 0 || col >= 8 || board[row][col] === '') {
    return false
  }

  if (board[row][col] === player) {
    return true
  }

  const shouldFlip = flip(
    player,
    board,
    row + direction[0],
    col + direction[1],
    direction
  )

  if (shouldFlip) {
    board[row][col] = player
    return shouldFlip
  }

  return false
}

const handleChipCount = (board: string[][]) => {
  const counts = [0, 0]

  for (const row of board) {
    for (const cell of row) {
      if (cell === 'B') {
        counts[0] += 1
      } else if (cell === 'W') {
        counts[1] += 1
      }
    }
  }
  return counts
}

export { handleFlipDirections, handleChipCount }
