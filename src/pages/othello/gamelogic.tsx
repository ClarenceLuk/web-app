import { BOARDSIZE, DIRECTIONS } from './constants'
import { OthelloState, Player } from './types'

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

const hasValidMoves = (row: number, col: number, player: Player) => {
   for (const direction of DIRECTIONS) {
   }
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

const handleValidMoves = (
  gameState: OthelloState,
  currentPlayer: Player,
  setGameState: (gameState: OthelloState) => void
): void => {
  const newGameState = {
    ...gameState,
    validMoves: {
      ...gameState.validMoves,
      [currentPlayer]: new Set(),
    },
  }
  if (gameState.chipCounts[currentPlayer] === 0) {
    setGameState(newGameState)
    return
  }

  // get a set of the surface area
  for (let row = 0; row < BOARDSIZE; row++) {
    for (let col = 0; col < BOARDSIZE; col++) {
      if (gameState.board[row][col] == 'black' || gameState.board[row][col] == 'white') {
        for (const direction of DIRECTIONS) {
          let rowCheck = row + direction[0]
          let colCheck = col + direction[1]
          if (rowCheck >= 0 && rowCheck < 8 && colCheck >= 0 && colCheck < 8 && gameState.board[rowCheck][colCheck] === '') {
            
          }
        }
      }
    }
  }
}

export { handleFlipDirections, handleChipCount, handleValidMoves }
