export interface OthelloState {
  board: string[][]
  player: Player
  chipCounts: { black: number; white: number }
  validMoves: {
    black: Set<Coordinate>
    white: Set<Coordinate>
  }
  possibleMoves: Set<string>
}

export type Coordinate = [number, number]

export type Player = 'black' | 'white'
