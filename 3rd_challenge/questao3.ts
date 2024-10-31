import promptSync from "prompt-sync";
import { Vertice } from "./models/Vertice";
import { PoligonoFactory } from "./models/PoligonoFactory";
import { Triangulo } from "./models/Triangulo";
import { Poligono } from "./models/Poligono";
import { PoligonoGenerico } from "./models/PoligonoGenerico";
const promptzim = promptSync();

/* MAIN */
function main() {
  const vertices: Vertice[] = [];
  const triangulos: Triangulo[] = [];
  const poligonos: Poligono[] = [];

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
    console.log("11. Criar um polígono genérico");
    console.log("12. Calcular perímetro de um polígono");
    console.log("13. Adicionar um vértice a um polígono");
    console.log("14. Verificar a quantidade de vértices de um polígono");
    console.log("15. Verificar igualdade entre dois polígonos");
    console.log("16. Sair");
    const entrada = promptzim("Opção -> ");
    const opcao = entrada !== null ? parseInt(entrada, 10) : null;

    switch (opcao) {
      case 1:
        const entradaX = promptzim("X do vértice -> ");
        const entradaY = promptzim("Y do vértice -> ");
        const x = entradaX !== null ? parseFloat(entradaX) : 0;
        const y = entradaY !== null ? parseFloat(entradaY) : 0;

        if (
          isNaN(x) ||
          typeof x !== "number" ||
          isNaN(y) ||
          typeof y !== "number"
        ) {
          console.log(
            "Ambas as coordenadas (X e Y) devem ser números válidos.",
          );
        } else {
          const novoVertice = new Vertice(x, y);
          vertices.push(novoVertice);
          console.log(
            `Vértice inserido em (${x}, ${y}) com índice ${vertices.length - 1}`,
          );
        }
        break;

      case 2:
        if (vertices.length === 0) {
          console.log(
            "Nenhum vértice criado. Use a opção 1 para criar um vértice.",
          );
          break;
        }
        const entradaIndice = promptzim("Índice do vértice para mover -> ");
        const indiceMover =
          entradaIndice !== null ? parseInt(entradaIndice, 10) : null;

        if (
          indiceMover !== null &&
          indiceMover >= 0 &&
          indiceMover < vertices.length
        ) {
          const entradaNovoX = promptzim("Novo X -> ");
          const entradaNovoY = promptzim("Novo Y -> ");
          const novoX = entradaNovoX !== null ? parseFloat(entradaNovoX) : 0;
          const novoY = entradaNovoY !== null ? parseFloat(entradaNovoY) : 0;

          if (isNaN(novoX) || isNaN(novoY)) {
            console.log(
              "Erro: As novas coordenadas (X e Y) devem ser números válidos.",
            );
          } else {
            vertices[indiceMover].move(novoX, novoY);
            console.log(
              `Vértice ${indiceMover} movido para (${novoX}, ${novoY})`,
            );
          }
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
        const entradaIndice1 = promptzim("Índice do primeiro vértice -> ");
        const entradaIndice2 = promptzim("Índice do segundo vértice -> ");
        const indice1 =
          entradaIndice1 !== null ? parseInt(entradaIndice1, 10) : null;
        const indice2 =
          entradaIndice2 !== null ? parseInt(entradaIndice2, 10) : null;
        if (indice1 != null && indice2 != null) {
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
        } else {
          console.log("Um ou ambos os índices são nulos.");
        }
        break;

      case 4:
        if (vertices.length < 2) {
          console.log(
            "É necessário pelo menos dois vértices para verificar a igualdade.",
          );
          break;
        }
        const entradaIndiceIgual1 = promptzim(
          "Índice do primeiro vértice para comparar -> ",
        );
        const entradaIndiceIgual2 = promptzim(
          "Índice do segundo vértice para comparar -> ",
        );
        const indiceIgual1 =
          entradaIndiceIgual1 !== null
            ? parseInt(entradaIndiceIgual1, 10)
            : null;
        const indiceIgual2 =
          entradaIndiceIgual2 !== null
            ? parseInt(entradaIndiceIgual2, 10)
            : null;
        if (indiceIgual1 != null && indiceIgual2 != null) {
          if (
            indiceIgual1 >= 0 &&
            indiceIgual1 < vertices.length &&
            indiceIgual2 >= 0 &&
            indiceIgual2 < vertices.length
          ) {
            const iguais = vertices[indiceIgual1].equals(
              vertices[indiceIgual2],
            );
            console.log(
              `Os vértices ${indiceIgual1} e ${indiceIgual2} ${iguais ? "são" : "não são"} iguais.`,
            );
          } else {
            console.log("Um ou ambos os índices são inválidos.");
          }
        } else {
          console.log("Pelo menos um dos dois índices são nulos");
        }
        break;

      case 5:
        if (vertices.length < 3) {
          console.log(
            "É necessário pelo menos três vértices para criar um triângulo.",
          );
          break;
        }
        const entradaIndiceV1 = promptzim("Índice do primeiro vértice -> ");
        const entradaIndiceV2 = promptzim("Índice do segundo vértice -> ");
        const entradaIndiceV3 = promptzim("Índice do terceiro vértice -> ");
        const indiceV1 =
          entradaIndiceV1 !== null ? parseInt(entradaIndiceV1, 10) : null;
        const indiceV2 =
          entradaIndiceV2 !== null ? parseInt(entradaIndiceV2, 10) : null;
        const indiceV3 =
          entradaIndiceV3 !== null ? parseInt(entradaIndiceV3, 10) : null;

        if (indiceV1 != null && indiceV2 != null && indiceV3 != null) {
          if (
            indiceV1 >= 0 &&
            indiceV1 < vertices.length &&
            indiceV2 >= 0 &&
            indiceV2 < vertices.length &&
            indiceV3 >= 0 &&
            indiceV3 < vertices.length
          ) {
            try {
              const triangulo = PoligonoFactory.criarPoligono([
                vertices[indiceV1],
                vertices[indiceV2],
                vertices[indiceV3],
              ]) as Triangulo;
              if (triangulo) {
                triangulos.push(triangulo);
                console.log("Triângulo criado com sucesso!");
              } else {
                console.log("Erro ao criar triângulo.");
              }
            } catch (error) {
              if (error instanceof Error) {
                console.log(error.message);
              } else {
                console.log("Ocorreu um erro desconhecido.");
              }
            }
          } else {
            console.log("Um ou mais índices são inválidos.");
          }
        } else {
          console.log("Pelo menos um dos índices do triangulo está nulo.");
        }
        break;

      case 6:
        if (triangulos.length < 2) {
          console.log(
            "É necessário pelo menos dois triângulos para verificar a igualdade.",
          );
          break;
        }
        const entradaIndiceTriangulo1 = promptzim(
          "Índice do primeiro triângulo para comparar ->",
        );
        const entradaIndiceTriangulo2 = promptzim(
          "Índice do segundo triângulo para comparar ->",
        );
        const indiceTrianguloIgual1 =
          entradaIndiceTriangulo1 !== null
            ? parseInt(entradaIndiceTriangulo1, 10)
            : null;
        const indiceTrianguloIgual2 =
          entradaIndiceTriangulo2 !== null
            ? parseInt(entradaIndiceTriangulo2, 10)
            : null;
        if (indiceTrianguloIgual1 != null && indiceTrianguloIgual2 != null) {
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
        } else {
          console.log("Um dos índices do triangulo está nulo.");
        }
        break;
      case 7: // Perímetro
        const entradaIndicePerimetro = promptzim("Índice do triângulo -> ");
        const indicePerimetro =
          entradaIndicePerimetro !== null
            ? parseInt(entradaIndicePerimetro, 10)
            : null;
        if (indicePerimetro != null) {
          if (
            Number.isInteger(indicePerimetro) &&
            triangulos[indicePerimetro]
          ) {
            console.log(
              `Perímetro do triângulo: ${triangulos[indicePerimetro].perimetro}`,
            );
          } else {
            console.log("Triângulo não encontrado ou índice inválido.");
          }
        } else {
          console.log("Índice do Triangulo está nulo");
        }
        break;

      case 8: // Tipo
        const entradaIndiceTipo = promptzim("Índice do triângulo -> ");
        const indiceTipo =
          entradaIndiceTipo !== null ? parseInt(entradaIndiceTipo, 10) : null;
        if (indiceTipo != null) {
          if (Number.isInteger(indiceTipo) && triangulos[indiceTipo]) {
            console.log(`Tipo do triângulo: ${triangulos[indiceTipo].tipo()}`);
          } else {
            console.log("Triângulo não encontrado ou índice inválido.");
          }
        } else {
          console.log("Índice do triângulo está nulo");
        }
        break;

      case 9: // Clonar
        const entradaIndiceClone = promptzim("Índice do triângulo -> ");
        const indiceClone =
          entradaIndiceClone !== null ? parseInt(entradaIndiceClone, 10) : null;
        if (indiceClone != null) {
          if (Number.isInteger(indiceClone) && triangulos[indiceClone]) {
            const clone = triangulos[indiceClone].clone();
            triangulos.push(clone);
            console.log("Triângulo clonado e adicionado à lista.");
          } else {
            console.log("Triângulo não encontrado ou índice inválido.");
          }
        } else {
          console.log("Índice do triângulo está nulo");
        }
        break;

      case 10: // Área
        const entradaIndiceArea = promptzim("Índice do triângulo: ");
        const indiceArea =
          entradaIndiceArea !== null ? parseInt(entradaIndiceArea, 10) : null;
        if (indiceArea != null) {
          if (Number.isInteger(indiceArea) && triangulos[indiceArea]) {
            console.log(
              `Área do triângulo: ${triangulos[indiceArea].area().toFixed(2)}`,
            );
          } else {
            console.log("Triângulo não encontrado ou índice inválido.");
          }
        } else {
          console.log("Índice do triângulo está nulo");
        }
        break;

      case 11: // Criar um polígono genérico
        const entradaNumVertices = promptzim(
          "Número de vértices do polígono -> ",
        );
        const numVertices =
          entradaNumVertices !== null ? parseInt(entradaNumVertices, 10) : null;
        const verticesPoligono = [];

        if (numVertices != null) {
          for (let i = 0; i < numVertices; i++) {
            const xStr = promptzim(`X do vértice ${i + 1} -> `);
            const yStr = promptzim(`Y do vértice ${i + 1} -> `);

            const x = xStr !== null ? parseFloat(xStr) : null;
            const y = yStr !== null ? parseFloat(yStr) : null;

            // Verifica se x e y são números válidos
            if (x == null || y == null) {
              console.log(
                `Os valores de X e Y devem ser números válidos. X: ${xStr}, Y: ${yStr}`,
              );
              i--; // Decrementa i para repetir a entrada
              break; // Interrompe o case 11
            }

            verticesPoligono.push(new Vertice(x, y));
          }

          try {
            const poligono = PoligonoFactory.criarPoligono(verticesPoligono);
            if (poligono) {
              poligonos.push(poligono);
              console.log("Polígono criado com sucesso");
            } else {
              console.log("Erro ao criar polígono.");
            }
          } catch (error) {
            if (error instanceof Error) {
              console.log(error.message);
            } else {
              console.log("Ocorreu um erro desconhecido.");
            }
          }
        } else {
          console.log("Número de vértices está nulo");
        }
        break;

      case 12: // Calcular perímetro de um polígono
        const entradaIndicePoligonos = promptzim("Índice do polígono -> ");
        const indicePoligono =
          entradaIndicePoligonos !== null
            ? parseInt(entradaIndicePoligonos, 10)
            : null;
        if (indicePoligono != null) {
          if (Number.isInteger(indicePoligono) && poligonos[indicePoligono]) {
            console.log(
              `Perímetro do polígono: ${poligonos[indicePoligono].perimetro()}`,
            );
          } else {
            console.log("Polígono não encontrado ou índice inválido.");
          }
        } else {
          console.log("Índice do polígono está nulo");
        }
        break;

      case 13: // Adicionar um vértice a um polígono
        const entradaIndicePoligonoAdd = promptzim("Índice do polígoino -> ");
        const indicePoligonoAdd =
          entradaIndicePoligonoAdd !== null
            ? parseInt(entradaIndicePoligonoAdd, 10)
            : null;
        if (indicePoligonoAdd != null) {
          if (
            Number.isInteger(indicePoligonoAdd) &&
            poligonos[indicePoligonoAdd]
          ) {
            const entradaInputX = promptzim("X do novo vértice -> ");
            const entradaInputY = promptzim("Y do novo vértice -> ");
            const x = entradaInputX !== null ? parseFloat(entradaInputX) : null;
            const y = entradaInputY !== null ? parseFloat(entradaInputY) : null;
            if (x != null && y != null) {
              const vertice = new Vertice(x, y);
              if (poligonos[indicePoligonoAdd].addVertice(vertice)) {
                console.log("Vértice adicionado com sucesso.");
              } else {
                console.log("O vértice já existe no polígono.");
              }
            } else {
              console.log("Coordenadas inválidas.");
            }
          } else {
            console.log("Polígono não encontrado ou índice inválido.");
          }
        } else {
          console.log("Índice do polígono está nulo");
        }
        break;

      case 14: // Verificar quantidade de vértices de um polígono
        const entradaIndicePoligonoQtd = promptzim("Índice do polígono -> ");
        const indicePoligonoQtd =
          entradaIndicePoligonoQtd !== null
            ? parseInt(entradaIndicePoligonoQtd, 10)
            : null;
        if (indicePoligonoQtd != null) {
          if (
            Number.isInteger(indicePoligonoQtd) &&
            poligonos[indicePoligonoQtd]
          ) {
            console.log(
              `Quantidade de vértices: ${poligonos[indicePoligonoQtd].vertices.length}`,
            );
          } else {
            console.log("Polígono não encontrado ou índice inválido.");
          }
        } else {
          console.log("Índice do polígono está nulo");
        }
        break;

      case 15: // Verificar igualdade entre dois polígonos
        const entradaIndicePoligono1 = promptzim(
          "Índice do primeiro polígono -> ",
        );
        const entradaIndicePoligono2 = promptzim(
          "Índice do segundo polígono -> ",
        );
        const indicePoligono1 =
          entradaIndicePoligono1 !== null
            ? parseInt(entradaIndicePoligono1, 10)
            : null;
        const indicePoligono2 =
          entradaIndicePoligono2 !== null
            ? parseInt(entradaIndicePoligono2, 10)
            : null;
        if (indicePoligono1 != null && indicePoligono2 != null) {
          if (
            Number.isInteger(indicePoligono1) &&
            Number.isInteger(indicePoligono2) &&
            poligonos[indicePoligono1] &&
            poligonos[indicePoligono2]
          ) {
            const iguais = poligonos[indicePoligono1].equals(
              poligonos[indicePoligono2],
            );
            console.log(`Os polígonos ${iguais ? "são" : "não são"} iguais.`);
          } else {
            console.log(
              "Um ou ambos os polígonos não foram encontrados ou índices inválidos.",
            );
          }
        } else {
          console.log("Pelo menos um dos dois índices está nulo");
        }
        break;
      case 16: // Sair
        console.log("Saindo...");
        return;
      default:
        if (opcao === null) {
          console.log("Nenhuma opção foi selecionada.");
        } else {
          console.log("Opção inválida:", opcao);
        }
        break;
    }
  }
}

main();
