import { BOARDSIZE, DIRECTIONS } from './constants'
import { OthelloState, Player } from './types'

const handleFlip = (
  gameState: OthelloState,
  setGameState: (gameState: OthelloState) => void,
  player: string,
  row: number,
  col: number
) => {

  const newGameState = {
    ...gameState,
    board: {...gameState.board}
  }
  newGameState.board[row][col] = player
  // also update valid moves and possible moves here
  setGameState(newGameState)


  for (const direction of DIRECTIONS) {
    if (row >= 0 && row < 8 && col >= 0 && col < 8 && gameState.board[row][col] !== '') {
      flip(player, gameState.board, row + direction[0], col + direction[1], direction)
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
  
}

export { handleFlip, handleChipCount, handleValidMoves }
