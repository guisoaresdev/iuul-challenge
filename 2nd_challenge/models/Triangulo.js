export class Triangulo {
  #vertices;

  constructor(vertice1, vertice2, vertice3) {
    this.#vertices = [vertice1, vertice2, vertice3];
    if (!this.formaTriangulo()) {
      throw new Error("Os vértices não formam um triângulo.");
    }
  }

  formaTriangulo() {
    const [v1, v2, v3] = this.#vertices;
    const d1 = v1.calcularDistancia(v2);
    const d2 = v2.calcularDistancia(v3);
    const d3 = v3.calcularDistancia(v1);
    return d1 + d2 > d3 && d1 + d3 > d2 && d2 + d3 > d1;
  }

  equals(triangulo) {
    return (
      this.#vertices[0].equals(triangulo.#vertices[0]) &&
      this.#vertices[1].equals(triangulo.#vertices[1]) &&
      this.#vertices[2].equals(triangulo.#vertices[2])
    );
  }

  get perimetro() {
    const [v1, v2, v3] = this.#vertices;
    const d1 = v1.calcularDistancia(v2);
    const d2 = v2.calcularDistancia(v3);
    const d3 = v3.calcularDistancia(v1);
    return d1 + d2 + d3;
  }

  tipo() {
    const [v1, v2, v3] = this.#vertices;
    const d1 = v1.calcularDistancia(v2);
    const d2 = v2.calcularDistancia(v3);
    const d3 = v3.calcularDistancia(v1);

    if (d1 === d2 && d2 === d3) return "Equilátero";
    if (d1 === d2 || d2 === d3 || d1 === d3) return "Isósceles";
    return "Escaleno";
  }

  clone() {
    return new Triangulo(...this.#vertices);
  }

  get area() {
    const [v1, v2, v3] = this.#vertices;
    const a = v1.calcularDistancia(v2);
    const b = v2.calcularDistancia(v3);
    const c = v3.calcularDistancia(v1);
    const s = (a + b + c) / 2;
    console.log(`Lados: a = ${a}, b = ${b}, c = ${c}`);
    console.log(`Semiperímetro (s) = ${s}`);
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    console.log(`Área calculada: ${area}`);
    return isNaN(area) ? 0 : parseFloat(area.toFixed(2));
  }
}
