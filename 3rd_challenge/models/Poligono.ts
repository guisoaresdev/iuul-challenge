import { Vertice } from "./Vertice";
/* CLASSES */
export abstract class Poligono {
  protected listaVertices: Vertice[];

  constructor(lista: Vertice[]) {
    if (!this.validarVertices(lista)) {
      throw new Error(
        "Os vértices devem ser instâncias da classe Vertice e deve haver pelo menos 3.",
      );
    }
    this.listaVertices = lista;
  }

  private validarVertices(lista: Vertice[]): boolean {
    return (
      lista.length >= 3 && lista.every((vertice) => vertice instanceof Vertice)
    );
  }

  addVertice(vertice: Vertice): boolean {
    this.listaVertices.push(vertice);
    return true; // Adicionou com sucesso
  }

  get vertices(): Vertice[] {
    return this.listaVertices;
  }

  abstract equals(poligono: Poligono): boolean;
  abstract area(): number;
  abstract perimetro(): number;
  abstract tipo(): string;
}
