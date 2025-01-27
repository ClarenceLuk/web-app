const handleFlipDirections = (player: string, board: string[][], row: number, col: number) => {
  const directions = [
    [1, 0], // Right
    [0, 1], // Down
    [-1, 0], // Left
    [0, -1], // Up
    [1, 1], // Diagonal Down-Right
    [-1, -1], // Diagonal Up-Left
    [1, -1], // Diagonal Up-Right
    [-1, 1] // Diagonal Down-Left
  ];

  board[row][col] = player;
  
  for (const direction of directions) {
    if (row >= 0 && row < 8 && col >= 0 && col < 8 && board[row][col] !== '') {
      flip(player, board, row + direction[0], col + direction[1], direction)
    }
  }
}

const flip = (player: string, board: string[][], row: number, col: number, direction: number[]): boolean => {
  if (row < 0 || row >= 8 || col < 0 || col >= 8 || board[row][col] == '') {
    return false
  }
  if (board[row][col] == player) {
    return true
  }

  const shouldFlip = flip(player, board, row + direction[0], col + direction[1], direction)

  if (shouldFlip) {
    board[row][col] = player
    return shouldFlip
  }
  
  return false

}

export {flip, handleFlipDirections}