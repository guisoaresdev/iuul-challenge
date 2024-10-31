import { Poligono } from "./Poligono";
import { Vertice } from "./Vertice";

export class Triangulo extends Poligono {
  constructor(lista: Vertice[]) {
    super(lista);
    if (!this.formaTriangulo()) {
      throw new Error("Os vértices não formam um triângulo.");
    }
  }

  addVertice(vertice: Vertice): boolean {
    throw new Error("Um triângulo não pode ter mais de 3 vértices.");
    return false; // Não permite adicionar mais vértices
  }

  formaTriangulo(): boolean {
    const [v1, v2, v3] = this.vertices;
    const d1 = v1.calcularDistancia(v2);
    const d2 = v2.calcularDistancia(v3);
    const d3 = v3.calcularDistancia(v1);
    return d1 + d2 > d3 && d1 + d3 > d2 && d2 + d3 > d1;
  }

  equals(poligono: Triangulo): boolean {
    if (!(poligono instanceof Triangulo)) return false;
    return this.vertices.every((vertice, index) =>
      vertice.equals(poligono.vertices[index]),
    );
  }

  perimetro(): number {
    const [v1, v2, v3] = this.vertices;
    const d1 = v1.calcularDistancia(v2);
    const d2 = v2.calcularDistancia(v3);
    const d3 = v3.calcularDistancia(v1);
    return d1 + d2 + d3;
  }

  tipo(): string {
    const [v1, v2, v3] = this.vertices;
    const d1 = v1.calcularDistancia(v2);
    const d2 = v2.calcularDistancia(v3);
    const d3 = v3.calcularDistancia(v1);

    if (d1 === d2 && d2 === d3) return "Equilátero";
    if (d1 === d2 || d2 === d3 || d1 === d3) return "Isósceles";
    return "Escaleno";
  }

  area(): number {
    const [v1, v2, v3] = this.vertices;
    const a = v1.calcularDistancia(v2);
    const b = v2.calcularDistancia(v3);
    const c = v3.calcularDistancia(v1);
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    return isNaN(area) ? 0 : parseFloat(area.toFixed(2));
  }

  clone(): Triangulo {
    return new Triangulo(this.vertices);
  }
}
