export interface OthelloState {
  board: string[][]
  player: 'B' | 'W'
  chipCounts: { black: number; white: number }
}
