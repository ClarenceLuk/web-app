import { OthelloState } from './types'

const INITIALBOARD: string[][] = [
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', 'W', 'B', '', '', ''],
  ['', '', '', 'B', 'W', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
]

const DIRECTIONS = [
  [1, 0], // Right
  [0, 1], // Down
  [-1, 0], // Left
  [0, -1], // Up
  [1, 1], // Diagonal Down-Right
  [-1, -1], // Diagonal Up-Left
  [1, -1], // Diagonal Up-Right
  [-1, 1], // Diagonal Down-Left
]

const DEFAULTGAMESTATE: OthelloState = {
  board: INITIALBOARD,
  player: 'B',
  chipCounts: { black: 2, white: 2 },
}

export { DIRECTIONS, DEFAULTGAMESTATE }
