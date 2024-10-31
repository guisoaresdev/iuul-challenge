import { Vertice } from "./Vertice";
import { Poligono } from "./Poligono";
import { Triangulo } from "./Triangulo";
import { PoligonoGenerico } from "./PoligonoGenerico.ts";

/* FACTORY */
export class PoligonoFactory {
  static criarPoligono(vertices: Vertice[]): Poligono | undefined {
    if (vertices.length < 3) {
      throw new Error("Um polígono deve ter pelo menos 3 vértices.");
      return undefined;
    }
    switch (vertices.length) {
      case 3:
        return new Triangulo(vertices);
      default:
        return new PoligonoGenerico(vertices);
    }
  }
}
