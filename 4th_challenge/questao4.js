import promptSync from "prompt-sync";
import { Turma } from "./models/Turma.js";
const prompt = promptSync();

class Aluno {
  constructor(matricula, nome, P1, P2) {
    this.matricula = matricula;
    this.nome = nome;
    this.P1 = P1;
    this.P2 = P2;
  }
}

const turma = new Turma();

function menu() {
  let opcao;
  do {
    console.log("\nMenu:");
    console.log("1. Inserir aluno");
    console.log("2. Remover aluno");
    console.log("3. Lançar nota");
    console.log("4. Imprimir alunos");
    console.log("5. Sair");
    opcao = prompt("Escolha uma opção: ");

    switch (opcao) {
      case "1":
        const matricula = prompt("Digite a matrícula do aluno: ");
        const nome = prompt("Digite o nome do aluno: ");
        const novoAluno = new Aluno(matricula, nome);
        turma.addTurma(novoAluno);
        break;

      case "2":
        const matriculaRemover = prompt(
          "Digite a matrícula do aluno a ser removido: ",
        );
        turma.removeAlunoPorMatricula(matriculaRemover);
        break;

      case "3":
        const matriculaNota = prompt("Digite a matrícula do aluno: ");
        const prova = prompt("Digite a prova (P1 ou P2): ");
        const nota = parseFloat(prompt("Digite a nota: "));
        turma.lancarNota(matriculaNota, prova, nota);
        break;

      case "4":
        turma.imprimirAlunos();
        break;

      case "5":
        console.log("Saindo do sistema...");
        break;

      default:
        console.log("Opção inválida! Tente novamente.");
    }
  } while (opcao !== "5");
}

menu();
