export class Vertice {
  constructor(
    private _x: number,
    private _y: number,
  ) {}

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  calcularDistancia(vertice: Vertice): number {
    const deltaX = vertice.x - this.x;
    const deltaY = vertice.y - this.y;
    return Math.sqrt(deltaX ** 2 + deltaY ** 2);
  }

  move(novoX: number, novoY: number) {
    this._x = novoX;
    this._y = novoY;
  }

  equals(vertice: Vertice): boolean {
    return this.x === vertice.x && this.y === vertice.y;
  }
}
