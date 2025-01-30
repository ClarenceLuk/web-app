import { DIRECTIONS } from './constants'
import { Coordinate, OthelloState, Player } from './types'

const handleFlip = (
  gameState: OthelloState,
  setGameState: (gameState: OthelloState) => void,
  player: string,
  row: number,
  col: number
) => {
  const newGameState = {
    ...gameState,
    board: { ...gameState.board },
  }
  newGameState.board[row][col] = player

  if (newGameState.possibleMoves.has(`${row},${col}`)) {
    newGameState.possibleMoves.delete(`${row},${col}`)
  }
  // also update valid moves and possible moves here
  setGameState(newGameState)

  for (const direction of DIRECTIONS) {
    if (
      row >= 0 &&
      row < 8 &&
      col >= 0 &&
      col < 8 &&
      gameState.board[row][col] !== ''
    ) {
      flip(
        player,
        gameState.board,
        row + direction[0],
        col + direction[1],
        direction
      )
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

const hasValidMoves = (gameState: OthelloState, row: number, col: number, player: Player): Set<Coordinate> => {
  // board[row][col] should be '' and checking for opposite player's token and then players token

  return new Set<Coordinate>([]) // placeholder
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

const handlePossibleMoves = (
  gameState: OthelloState,
  row: number,
  col: number
) => {
  const newPossibleMoves = new Set(gameState.possibleMoves)
  newPossibleMoves.delete(`${row},${col}`)
  for (const direction of DIRECTIONS) {
    const newRow = row+direction[0]
    const newCol = col+direction[1]
    if (gameState.board[newRow][newCol] === '') {
      newPossibleMoves.add(`${newRow},${newCol}`)
    }
  }

  return newPossibleMoves
}

const handleValidMoves = (
  gameState: OthelloState,
  currentPlayer: Player,
  setGameState: (gameState: OthelloState) => void,
  row: number,
  col: number
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

  const newPossibleMoves = handlePossibleMoves(gameState, row, col)
  newGameState.possibleMoves = newPossibleMoves

  // now get valid moves for the current player
  const newCurrentPlayerValidMoves = hasValidMoves(gameState, row, col, currentPlayer)
  newGameState.validMoves[currentPlayer] = newCurrentPlayerValidMoves

  setGameState(newGameState)
}

export { handleFlip, handleChipCount, handleValidMoves }
