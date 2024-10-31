import promptSync from "prompt-sync";
import { Pessoa } from "./models/Pessoa";
const prompt = promptSync();

function menu() {
  const pessoa = new Pessoa();
  let opcao: number;

  do {
    console.log("\n--- Menu ---");
    console.log("1. Capturar dados");
    console.log("2. Exibir dados");
    console.log("0. Sair");

    opcao = parseInt(prompt("Escolha uma opção: ") as string);

    switch (opcao) {
      case 1:
        pessoa.capturarDados();
        break;
      case 2:
        pessoa.exibirDados();
        break;
      case 0:
        console.log("Saindo...");
        break;
      default:
        console.log("Opção inválida! Tente novamente.");
    }
  } while (opcao !== 0);
}

menu();
