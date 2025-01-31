import { cloneDeep } from 'lodash'
import { DIRECTIONS } from './constants'
import { Coordinate, OthelloState, Player } from './types'

const handleFlip = (
  board: string[][],
  player: Player,
  row: number,
  col: number
) => {
  const newBoard: string[][] = cloneDeep(board)
  newBoard[row][col] = player
  // also update valid moves and possible moves here

  for (const direction of DIRECTIONS) {
    if (
      row >= 0 &&
      row < 8 &&
      col >= 0 &&
      col < 8 &&
      newBoard[row][col] !== ''
    ) {
      flip(
        player,
        newBoard,
        row + direction[0],
        col + direction[1],
        direction
      )
    }
  }

  return newBoard
}

const flip = (
  player: Player,
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
      if (cell === 'black') {
        counts[0] += 1
      } else if (cell === 'white') {
        counts[1] += 1
      }
    }
  }
  return counts
}

const handlePossibleMoves = (
  board: string[][],
  possibleMoves: Set<string>,
  row: number,
  col: number
): Set<string> => {
  const newPossibleMoves = new Set<string>(possibleMoves)
  newPossibleMoves.delete(`${row},${col}`)
  for (const direction of DIRECTIONS) {
    const newRow = row+direction[0]
    const newCol = col+direction[1]
    if (newRow >= 0 &&
      newRow < 8 &&
      newCol >= 0 &&
      newCol < 8 &&
      board[newRow][newCol] === '') {
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

  // now get valid moves for the current player
  const newCurrentPlayerValidMoves = hasValidMoves(gameState, row, col, currentPlayer)
  newGameState.validMoves[currentPlayer] = newCurrentPlayerValidMoves

  setGameState(newGameState)
}

export { handleFlip, handleChipCount, handleValidMoves, handlePossibleMoves }
