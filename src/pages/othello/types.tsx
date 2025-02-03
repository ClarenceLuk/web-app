export interface OthelloState {
  board: string[][]
  player: Player
  chipCounts: ChipCounts
  validMoves: ValidMoves
  possibleMoves: PossibleMoves
  openModal: boolean
}

export type ValidMoves = {
  black: { [key: string]: Coordinate }
  white: { [key: string]: Coordinate }
}

export type ChipCounts = { black: number; white: number }

export type PossibleMoves = { [key: string]: Coordinate }

export type Coordinate = [number, number]

export type Player = 'black' | 'white'

export type Board = string[][]
