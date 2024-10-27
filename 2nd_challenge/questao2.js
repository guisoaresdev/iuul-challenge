const prompt = require("prompt-sync")();

/* CLASSES */
class Vertice {
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
    const deltaX = vertice.x - this.#x;
    const deltaY = vertice.y - this.#y;
    return Math.sqrt(deltaX ** 2 + deltaY ** 2);
  }

  move(novoX, novoY) {
    this.#x = novoX;
    this.#y = novoY;
  }

  equals(vertice) {
    return this.#x === vertice.x && this.#y === vertice.y;
  }
}

class Triangulo {
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
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
  }
}

/* MAIN */
function main() {
  const vertices = [];
  const triangulos = [];

  while (true) {
    console.log("\nSelecione uma opção:");
    console.log("1. Inserir um vértice");
    console.log("2. Mover um vértice");
    console.log("3. Calcular distância euclidiana entre dois vértices");
    console.log("4. Verificar igualdade entre dois vértices");
    console.log("5. Criar um triângulo");
    console.log("6. Verificar igualdade entre dois triângulos");
    console.log("7. Sair");
    const opcao = parseInt(prompt("Opção -> "), 10);

    switch (opcao) {
      case 1:
        const x = parseFloat(prompt("X do vértice -> "));
        const y = parseFloat(prompt("Y do vértice -> "));
        const novoVertice = new Vertice(x, y);
        vertices.push(novoVertice);
        console.log(
          `Vértice inserido em (${x}, ${y}) com índice ${vertices.length - 1}`,
        );
        break;

      case 2:
        if (vertices.length === 0) {
          console.log(
            "Nenhum vértice criado. Use a opção 1 para criar um vértice.",
          );
          break;
        }
        const indiceMover = parseInt(
          prompt("Índice do vértice para mover -> "),
          10,
        );
        if (indiceMover >= 0 && indiceMover < vertices.length) {
          const novoX = parseFloat(prompt("Novo X -> "));
          const novoY = parseFloat(prompt("Novo Y -> "));
          vertices[indiceMover].move(novoX, novoY);
          console.log(
            `Vértice ${indiceMover} movido para (${novoX}, ${novoY})`,
          );
        } else {
          console.log("Índice inválido.");
        }
        break;

      case 3:
        if (vertices.length < 2) {
          console.log(
            "É necessário pelo menos dois vértices para calcular a distância.",
          );
          break;
        }
        const indice1 = parseInt(prompt("Índice do primeiro vértice -> "), 10);
        const indice2 = parseInt(prompt("Índice do segundo vértice -> "), 10);
        if (
          indice1 >= 0 &&
          indice1 < vertices.length &&
          indice2 >= 0 &&
          indice2 < vertices.length
        ) {
          const distancia = vertices[indice1].calcularDistancia(
            vertices[indice2],
          );
          console.log(
            `A distância euclidiana entre o vértice ${indice1} e o vértice ${indice2} é: ${distancia.toFixed(2)}`,
          );
        } else {
          console.log("Um ou ambos os índices são inválidos.");
        }
        break;

      case 4:
        if (vertices.length < 2) {
          console.log(
            "É necessário pelo menos dois vértices para verificar a igualdade.",
          );
          break;
        }
        const indiceIgual1 = parseInt(
          prompt("Índice do primeiro vértice para comparar -> "),
          10,
        );
        const indiceIgual2 = parseInt(
          prompt("Índice do segundo vértice para comparar -> "),
          10,
        );
        if (
          indiceIgual1 >= 0 &&
          indiceIgual1 < vertices.length &&
          indiceIgual2 >= 0 &&
          indiceIgual2 < vertices.length
        ) {
          const iguais = vertices[indiceIgual1].equals(vertices[indiceIgual2]);
          console.log(
            `Os vértices ${indiceIgual1} e ${indiceIgual2} ${iguais ? "são" : "não são"} iguais.`,
          );
        } else {
          console.log("Um ou ambos os índices são inválidos.");
        }
        break;

      case 5:
        if (vertices.length < 3) {
          console.log(
            "É necessário pelo menos três vértices para criar um triângulo.",
          );
          break;
        }
        const indiceTriangulo1 = parseInt(
          prompt("Índice do primeiro vértice -> "),
          10,
        );
        const indiceTriangulo2 = parseInt(
          prompt("Índice do segundo vértice -> "),
          10,
        );
        const indiceTriangulo3 = parseInt(
          prompt("Índice do terceiro vértice -> "),
          10,
        );
        if (
          indiceTriangulo1 >= 0 &&
          indiceTriangulo1 < vertices.length &&
          indiceTriangulo2 >= 0 &&
          indiceTriangulo2 < vertices.length &&
          indiceTriangulo3 >= 0 &&
          indiceTriangulo3 < vertices.length
        ) {
          try {
            const triangulo = new Triangulo(
              vertices[indiceTriangulo1],
              vertices[indiceTriangulo2],
              vertices[indiceTriangulo3],
            );
            triangulos.push(triangulo);
            console.log(
              `Triângulo criado com vértices: ${indiceTriangulo1}, ${indiceTriangulo2}, ${indiceTriangulo3}`,
            );
          } catch (error) {
            console.log(error.message);
          }
        } else {
          console.log("Um ou mais índices são inválidos.");
        }
        break;

      case 6:
        if (triangulos.length < 2) {
          console.log(
            "É necessário pelo menos dois triângulos para verificar a igualdade.",
          );
          break;
        }
        const indiceTrianguloIgual1 = parseInt(
          prompt("Índice do primeiro triângulo para comparar -> "),
          10,
        );
        const indiceTrianguloIgual2 = parseInt(
          prompt("Índice do segundo triângulo para comparar -> "),
          10,
        );
        if (
          indiceTrianguloIgual1 >= 0 &&
          indiceTrianguloIgual1 < triangulos.length &&
          indiceTrianguloIgual2 >= 0 &&
          indiceTrianguloIgual2 < triangulos.length
        ) {
          const iguais = triangulos[indiceTrianguloIgual1].equals(
            triangulos[indiceTrianguloIgual2],
          );
          console.log(
            `Os triângulos ${indiceTrianguloIgual1} e ${indiceTrianguloIgual2} ${iguais ? "são" : "não são"} iguais.`,
          );
        } else {
          console.log("Um ou ambos os índices são inválidos.");
        }
        break;

      case 7:
        console.log("Saindo...");
        return;

      default:
        console.log("Opção inválida. Tente novamente.");
        break;
    }
  }
}

main();
