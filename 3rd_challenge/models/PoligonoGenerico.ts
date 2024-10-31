import { Poligono } from "./Poligono.ts";

export class PoligonoGenerico extends Poligono {
  constructor(lista: Vertice[]) {
    super(lista);
  }

  addVertice(vertice: Vertice): boolean {
    this.vertices.push(vertice);
    return true; // Sempre permite adicionar vértices
  }

  // Método para calcular a orientação entre três pontos
  calcularOrientacao(p: Vertice, q: Vertice, r: Vertice): number {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val === 0) return 0; // Colinear
    return val > 0 ? 1 : 2; // Horário ou anti-horário
  }

  // Método para verificar se duas linhas se cruzam
  seCruzam(p1: Vertice, q1: Vertice, p2: Vertice, q2: Vertice): boolean {
    const o1 = this.calcularOrientacao(p1, q1, p2);
    const o2 = this.calcularOrientacao(p1, q1, q2);
    const o3 = this.calcularOrientacao(p2, q2, p1);
    const o4 = this.calcularOrientacao(p2, q2, q1);

    return o1 !== o2 && o3 !== o4;
  }

  formaPoligono(): boolean {
    const n = this.vertices.length;
    if (n < 3) return false; // Um polígono deve ter pelo menos 3 vértices

    // Verificar se os lados se cruzam
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const p1 = this.vertices[i];
        const q1 = this.vertices[(i + 1) % n];
        const p2 = this.vertices[j];
        const q2 = this.vertices[(j + 1) % n];

        if (i !== j && i + 1 !== j && j + 1 !== i) {
          // Para evitar verificar arestas adjacentes
          if (this.seCruzam(p1, q1, p2, q2)) {
            return false; // As arestas se cruzam, não é um polígono válido
          }
        }
      }
    }

    return true; // O polígono é válido
  }

  equals(poligono: Poligono): boolean {
    if (!(poligono instanceof PoligonoGenerico)) return false;
    return this.vertices.every((vertice, index) =>
      vertice.equals(poligono.vertices[index]),
    );
  }

  perimetro(): number {
    return this.vertices.reduce((total, vertice, index) => {
      const nextIndex = (index + 1) % this.vertices.length;
      return total + vertice.calcularDistancia(this.vertices[nextIndex]);
    }, 0);
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

  clone() {
    return new PoligonoGenerico(this.vertices);
  }

  area(): number {
    const n = this.vertices.length;
    let area = 0;

    for (let i = 0; i < n; i++) {
      const v1 = this.vertices[i];
      const v2 = this.vertices[(i + 1) % n]; // O próximo vértice, com wrap-around
      area += v1.x * v2.y - v2.x * v1.y;
    }

    area = Math.abs(area) / 2;
    return parseFloat(area.toFixed(2)); // Retorna a área com duas casas decimais
  }
}
