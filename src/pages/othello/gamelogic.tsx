import { cloneDeep } from 'lodash'
import { DIRECTIONS, PLAYER } from './constants'
import {
  OthelloState,
  Player,
  PossibleMoves,
  ValidMoves,
} from './types'

const validCoordinates = (row: number, col: number) => {
  return (row >= 0 && row < 8 && col >= 0 && col < 8)
}

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
      validCoordinates(row, col) &&
      newBoard[row][col] !== ''
    ) {
      flip(player, newBoard, row + direction[0], col + direction[1], direction)
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
  if (!validCoordinates(row, col) || board[row][col] === '') {
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
  possibleMoves: PossibleMoves,
  row: number,
  col: number
): PossibleMoves => {
  const newPossibleMoves = { ...possibleMoves }
  delete newPossibleMoves[`${row},${col}`]
  for (const direction of DIRECTIONS) {
    const newRow = row + direction[0]
    const newCol = col + direction[1]
    if (
      validCoordinates(newRow, newCol) &&
      board[newRow][newCol] === ''
    ) {
      newPossibleMoves[`${newRow},${newCol}`] = [newRow, newCol]
    }
  }

  return newPossibleMoves
}

const hasValidMoves = (
  gameState: OthelloState,
  row: number,
  col: number,
  direction: number[],
  player: Player
): boolean => {
  console.log('ran')
  if (gameState.board[row][col] === player) {
    return true
  }
  if (gameState.board[row][col] === '') {
    return false
  }

  return hasValidMoves(gameState, row + direction[0], col + direction[1], direction, player)
}

const handleValidMoves = (
  gameState: OthelloState,
  possibleMoves: PossibleMoves
): ValidMoves => {
  const newValidMoves: ValidMoves = {
    black: {},
    white: {}
  }
  for (const coords of Object.values(possibleMoves)) {
    for (const direction of DIRECTIONS) {
      const row = coords[0] + direction[0]
      const col = coords[1] + direction[1]
      if (validCoordinates(row, col)) {
        if (gameState.board[row][col] === PLAYER.white && hasValidMoves(gameState, row, col, direction, PLAYER.black)) {
          newValidMoves.black[`${row},${col}`] = [row, col]
        }
        if (gameState.board[row][col] === PLAYER.black && hasValidMoves(gameState, row, col, direction, PLAYER.white)) {
          newValidMoves.white[`${row},${col}`] = [row, col]
        }
      }
    }
  }
  

  return newValidMoves
}

export { handleFlip, handleChipCount, handleValidMoves, handlePossibleMoves }
