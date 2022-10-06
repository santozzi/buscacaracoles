export interface Point {
  x: number;
  y: number;
}
export interface Visited {
  point: Point,
  visited: boolean,

}
export interface Counter {
  visited: Visited[],
  count: number
}
export interface Casilla {
  spider: boolean,
  numberAround: number,
  point: Point,
  flag: boolean,
  void: boolean,
  snail: boolean
}
export interface Win {
  cantTotal: number,
  cantInicial: number,

}