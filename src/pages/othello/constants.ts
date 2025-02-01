import { handleValidMoves } from './gamelogic'
import { OthelloState, Player, PossibleMoves, ValidMoves } from './types'

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

const PLAYER: { [key: string]: Player } = {
  black: 'black',
  white: 'white',
}

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

const INITIALPOSSIBLEMOVES: PossibleMoves = {
  '2,2': [2, 2],
  '3,2': [3, 2],
  '4,2': [4, 2],
  '5,2': [5, 2],
  '2,3': [2, 3],
  '2,4': [2, 4],
  '2,5': [2, 5],
  '3,5': [3, 5],
  '4,5': [4, 5],
  '5,5': [5, 5],
  '5,3': [5, 3],
  '5,4': [5, 4],
}

const DEFAULTGAMESTATE: OthelloState = {
  board: INITIALBOARD,
  player: PLAYER.black,
  chipCounts: { black: 2, white: 2 },
  validMoves: {
    black: { '2,3': [2, 3], '3,2': [3, 2], '5,4': [5, 4], '4,5': [4, 5] },
    white: { '2,4': [2, 4], '4,2': [4, 2], '5,4': [3, 5], '5,3': [5, 3] },
  },
  possibleMoves: INITIALPOSSIBLEMOVES,
}

export { DIRECTIONS, DEFAULTGAMESTATE, BOARDSIZE, PLAYER }
