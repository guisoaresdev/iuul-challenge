export class Vertice {
  #x;
  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  calcularDistancia(vertice) {
    const deltaX = vertice.x - this.x;
    const deltaY = vertice.y - this.y;
    return Math.sqrt(deltaX ** 2 + deltaY ** 2);
  }

  move(novoX, novoY) {
    this.#x = novoX;
    this.#y = novoY;
  }

  equals(vertice) {
    return this.x === vertice.x && this.y === vertice.y;
  }
}
