import { cloneDeep } from 'lodash'
import { DIRECTIONS, PLAYER } from './constants'
import { Board, ChipCounts, Player, PossibleMoves, ValidMoves } from './types'

const validCoordinates = (row: number, col: number) => {
  return row >= 0 && row < 8 && col >= 0 && col < 8
}

const handleFlip = (board: Board, player: Player, row: number, col: number) => {
  const newBoard: Board = cloneDeep(board)
  newBoard[row][col] = player
  // also update valid moves and possible moves here

  for (const direction of DIRECTIONS) {
    if (validCoordinates(row, col) && newBoard[row][col] !== '') {
      flip(player, newBoard, row + direction[0], col + direction[1], direction)
    }
  }

  return newBoard
}

const flip = (
  player: Player,
  board: Board,
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

const handleChipCount = (board: Board) => {
  const counts: ChipCounts = {black: 0, white: 0}

  for (const row of board) {
    for (const cell of row) {
      if (cell === PLAYER.black || cell === PLAYER.white) {
        counts[cell] += 1
      }
    }
  }
  return counts
}

const handlePossibleMoves = (
  board: Board,
  possibleMoves: PossibleMoves,
  row: number,
  col: number
): PossibleMoves => {
  const newPossibleMoves = { ...possibleMoves }
  delete newPossibleMoves[`${row},${col}`]
  for (const direction of DIRECTIONS) {
    const newRow = row + direction[0]
    const newCol = col + direction[1]
    if (validCoordinates(newRow, newCol) && board[newRow][newCol] === '') {
      newPossibleMoves[`${newRow},${newCol}`] = [newRow, newCol]
    }
  }

  return newPossibleMoves
}

const hasValidMoves = (
  board: Board,
  row: number,
  col: number,
  direction: number[],
  player: Player
): boolean => {
  if (!validCoordinates(row, col)) {
    return false
  }
  if (board[row][col] === player) {
    return true
  }
  if (board[row][col] === '') {
    return false
  }

  return hasValidMoves(
    board,
    row + direction[0],
    col + direction[1],
    direction,
    player
  )
}

const handleValidMoves = (
  board: Board,
  possibleMoves: PossibleMoves
): ValidMoves => {
  const newValidMoves: ValidMoves = {
    black: {},
    white: {},
  }
  for (const coords of Object.values(possibleMoves)) {
    for (const direction of DIRECTIONS) {
      const row = coords[0]
      const col = coords[1]
      const nextRow = coords[0] + direction[0]
      const nextCol = coords[1] + direction[1]
      if (validCoordinates(nextRow, nextCol)) {
        if (
          board[nextRow][nextCol] === PLAYER.white &&
          hasValidMoves(board, nextRow, nextCol, direction, PLAYER.black)
        ) {
          newValidMoves.black[`${row},${col}`] = [row, col]
        }
        if (
          board[nextRow][nextCol] === PLAYER.black &&
          hasValidMoves(board, nextRow, nextCol, direction, PLAYER.white)
        ) {
          newValidMoves.white[`${row},${col}`] = [row, col]
        }
      }
    }
  }

  return newValidMoves
}

const handlePlayerTurn = (
  validMoves: ValidMoves,
  currentPlayer: Player,
  nextPlayer: Player
) => {
  if (Object.keys(validMoves[nextPlayer]).length === 0) {
    return currentPlayer
  }
  return nextPlayer
}

const handleWinningCondition = (chipCounts: ChipCounts): boolean => {
  return chipCounts.black === 0 || chipCounts.white === 0 || chipCounts.black + chipCounts.white === 64
}

export {
  handleFlip,
  handleChipCount,
  handleValidMoves,
  handlePossibleMoves,
  handlePlayerTurn,
  handleWinningCondition
}
