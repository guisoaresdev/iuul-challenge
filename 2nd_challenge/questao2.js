import promptSync from "prompt-sync";
import { Vertice } from "../1st_challenge/models/Vertice.js";
import { Triangulo } from "../2nd_challenge/models/Triangulo.js";

const prompt = promptSync();
/* CLASSES */

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
    console.log("7. Calcular perímetro de um triângulo");
    console.log("8. Determinar o tipo de um triângulo");
    console.log("9. Clonar um triângulo");
    console.log("10. Calcular área de um triângulo");
    console.log("11. Sair");
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
      case 7: // Perímetro
        const indicePerimetro = parseInt(prompt("Índice do triângulo -> "), 10);
        if (triangulos[indicePerimetro]) {
          console.log(
            `Perímetro do triângulo: ${triangulos[indicePerimetro].perimetro}`,
          );
        } else {
          console.log("Triângulo não encontrado.");
        }
        break;

      case 8: // Tipo
        const indiceTipo = parseInt(prompt("Índice do triângulo -> "), 10);
        if (triangulos[indiceTipo]) {
          console.log(`Tipo do triângulo: ${triangulos[indiceTipo].tipo()}`);
        } else {
          console.log("Triângulo não encontrado.");
        }
        break;

      case 9: // Clonar
        const indiceClone = parseInt(prompt("Índice do triângulo -> "), 10);
        if (triangulos[indiceClone]) {
          const clone = triangulos[indiceClone].clone();
          triangulos.push(clone);
          console.log("Triângulo clonado e adicionado à lista.");
        } else {
          console.log("Triângulo não encontrado.");
        }
        break;

      case 10: // Área
        const indiceArea = parseInt(prompt("Índice do triângulo -> "), 10);
        if (triangulos[indiceArea]) {
          console.log(
            `Área do triângulo: ${triangulos[indiceArea].area.toFixed(2)}`,
          );
        } else {
          console.log("Triângulo não encontrado.");
        }
        break;

      case 11:
        console.log("Saindo...");
        return;

      default:
        console.log("Opção inválida. Tente novamente.");
        break;
    }
  }
}

main();
