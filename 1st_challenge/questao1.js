import promptSync from "prompt-sync";
const prompt = promptSync();

/* CLASSES */
export default class Vertice {
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

/* MAIN */
function main() {
  const vertices = [];

  while (true) {
    console.log("\nSelecione uma opção:");
    console.log("1. Inserir um vértice");
    console.log("2. Mover um vértice");
    console.log("3. Calcular distância euclidiana entre dois vértices");
    console.log("4. Verificar igualdade entre dois vértices");
    console.log("5. Sair");
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
        console.log("Saindo...");
        return;

      default:
        console.log("Opção inválida. Tente novamente.");
    }
  }
}

main();
