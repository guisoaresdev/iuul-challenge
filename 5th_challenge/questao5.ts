import promptSync from "prompt-sync";
const prompt = promptSync();

class Pessoa {
  private nome!: string;
  private cpf!: number;
  private data_nascimento!: Date;
  private renda_mensal!: number;
  private estado_civil!: string;
  private dependentes!: number;

  public capturarDados() {
    this.capturarNome();
    this.capturarCPF();
    this.capturarDataNascimento();
    this.capturarRendaMensal();
    this.capturarEstadoCivil();
    this.capturarDependentes();
  }

  private capturarNome(): void {
    let nome: string;
    do {
      nome = prompt("Insira o nome (pelo menos 5 caracteres): ") as string;
      if (nome !== null) {
        if (nome.length >= 5) {
          this.nome = nome;
          break;
        }
      }
      throw new Error("Nome inválido! Tente novamente.");
    } while (true);
  }

  private capturarCPF(): void {
    let cpf: string;
    do {
      cpf = prompt(
        "Insira o CPF (11 digitos ou 14 dígitos com pontuação): ",
      ) as string;
      if (/^\d{11}$/.test(cpf)) {
        this.cpf = parseInt(cpf);
        break;
      } else if (/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
        this.cpf = parseInt(cpf.replace(/\D/g, ""));
        break;
      }
      throw new Error(
        "CPF Inválido! CPF deve conter exatos 11 dígitos ou 14 com pontuação correta.",
      );
    } while (true);
  }

  private capturarDataNascimento(): void {
    let data: string;
    do {
      data = prompt(
        "Insira a data de nascimento (DD/MM/AAAA, DD-MM-AAAA ou DDMMYYYY): ",
      ) as string;

      const regex = /^(?:(\d{2})[\/-]?(\d{2})[\/-]?(\d{4})|\d{8})$/;

      if (!regex.test(data)) {
        throw new Error("Data de nascimento inválida! Tente novamente.");
      }

      let dia: number, mes: number, ano: number;

      if (data.length === 8) {
        dia = Number(data.slice(0, 2));
        mes = Number(data.slice(2, 4));
        ano = Number(data.slice(4, 8));
      } else {
        const partes = data.split(/[/\-]/).map(Number);
        [dia, mes, ano] = partes;
      }

      const dataNasc = new Date(ano, mes - 1, dia);
      const idade = new Date().getFullYear() - dataNasc.getFullYear();

      if (!isNaN(dataNasc.getTime()) && idade >= 18) {
        this.data_nascimento = dataNasc;
        break;
      }

      throw new Error(
        "Data de nascimento inválida ou menor de 18 anos! Tente novamente.",
      );
    } while (true);
  }

  private capturarRendaMensal(): void {
    let renda: string;
    do {
      renda = prompt("Insira a renda mensal (≥ 0): R$ ") as string;
      const valor = parseFloat(renda.replace(",", "."));
      if (valor >= 0) {
        this.renda_mensal = parseFloat(valor.toFixed(2));
        break;
      }
      throw new Error("Renda inválida! Tente novamente.");
    } while (true);
  }

  private capturarEstadoCivil(): void {
    let estado: string;
    const estadosValidos = ["C", "S", "V", "D"];
    do {
      estado = prompt("Insira o estado civil (C, S, V, D): ") as string;
      if (estadosValidos.includes(estado.toUpperCase())) {
        this.estado_civil = estado.toUpperCase();
        break;
      }
      throw new Error("Estado civil inválido! Tente novamente.");
    } while (true);
  }

  private capturarDependentes(): void {
    let dependentes: string;
    do {
      dependentes = prompt(
        "Insira o número de dependentes (0 a 10): ",
      ) as string;
      const numDependentes = parseInt(dependentes);
      if (
        !isNaN(numDependentes) &&
        numDependentes >= 0 &&
        numDependentes <= 10
      ) {
        this.dependentes = numDependentes;
        break;
      }
      throw new Error("Número de dependentes inválido! Tente novamente.");
    } while (true);
  }

  exibirDados(): void {
    const cpfFormatado = this.cpf
      .toString()
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    const dataFormatada = `${this.data_nascimento.getDate().toString().padStart(2, "0")}/${(this.data_nascimento.getMonth() + 1).toString().padStart(2, "0")}/${this.data_nascimento.getFullYear()}`;
    const rendaFormatada = this.renda_mensal.toFixed(2).replace(".", ",");

    console.log(`Nome: ${this.nome}`);
    console.log(`CPF: ${cpfFormatado}`);
    console.log(`Data de Nascimento: ${dataFormatada}`);
    console.log(`Renda Mensal: R$ ${rendaFormatada}`);
    console.log(`Estado Civil: ${this.estado_civil}`);
    console.log(`Dependentes: ${this.dependentes}`);
  }
}

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
