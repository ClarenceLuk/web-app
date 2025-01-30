import { Coordinate, OthelloState } from './types'

const BOARDSIZE = 8

const INITIALBOARD: string[][] = [
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', 'white', 'black', '', '', ''],
  ['', '', '', 'black', 'white', '', '', ''],
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
  player: 'black',
  chipCounts: { black: 2, white: 2 },
  validMoves: {
    black: new Set<Coordinate>(),
    white: new Set<Coordinate>(),
  },
  possibleMoves: new Set<Coordinate>([
    [2, 2],
    [3, 2],
    [4, 2],
    [5, 2],
    [2, 3],
    [2, 4],
    [2, 5],
    [3, 5],
    [4, 5],
    [5, 5],
    [5, 3],
    [5, 4],
  ]),
}

export { DIRECTIONS, DEFAULTGAMESTATE, BOARDSIZE }
