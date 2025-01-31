export interface OthelloState {
  board: string[][]
  player: Player
  chipCounts: { black: number; white: number }
  validMoves: {
    black: Set<Coordinate>
    white: Set<Coordinate>
  }
  possibleMoves: PossibleMoves
}

export type PossibleMoves = { [key: string]: Coordinate }

export type Coordinate = [number, number]

export type Player = 'black' | 'white'
