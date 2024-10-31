export class Turma {
  #sala;

  constructor(sala) {
    this.#sala = [];
  }

  get alunos() {
    return this.#sala;
  }

  addTurma(aluno) {
    if (this.isMatriculaDuplicada(aluno.matricula)) {
      console.log(`A matrícula ${aluno.matricula} ja existe na turma`);
    } else {
      this.#sala.push(aluno);
      console.log(`Aluno ${aluno.nome} adicionado com sucesso.`);
    }
  }

  removeAlunoPorMatricula(matricula) {
    const index = this.#sala.findIndex(
      (aluno) => aluno.matricula === matricula,
    );
    if (index !== -1) {
      this.#sala.splice(index, 1);
      console.log(`Aluno com matrícula ${matricula} removido da turma.`);
    } else {
      console.log(`Nenhum aluno encontrado com a matrícula ${matricula}.`);
    }
  }

  isMatriculaDuplicada(matricula) {
    for (let aluno of this.#sala) {
      if (aluno.matricula === matricula) {
        return true;
      }
    }
    return false;
  }

  calcularNotaFinal(aluno) {
    const nota1 = aluno.P1 || 0;
    const nota2 = aluno.P2 || 0;
    const resultado = (nota1 + nota2) / 2;
    return resultado;
  }

  lancarNota(matricula, prova, nota) {
    const aluno = this.#sala.find((aluno) => aluno.matricula === matricula);

    if (aluno) {
      if (prova === "P1") {
        aluno.P1 = nota;
        console.log(`Nota P1 de ${nota} lançada para o aluno ${aluno.nome}.`);
      } else if (prova === "P2") {
        aluno.P2 = nota;
        console.log(`Nota P2 de ${nota} lançada para o aluno ${aluno.nome}.`);
      } else {
        console.log("Prova inválida. Escolha entre P1 e P2.");
      }
    } else {
      console.log(`Nenhum aluno encontrado com a matrícula ${matricula}.`);
    }
  }

  imprimirAlunos() {
    const alunosOrdenados = [...this.#sala].sort((a, b) =>
      a.nome.localeCompare(b.nome),
    );

    console.log("Alunos da Turma:");
    alunosOrdenados.forEach((aluno) => {
      const notaFinal = this.calcularNotaFinal(aluno);
      console.log(
        `Matrícula: ${aluno.matricula} | Nome: ${aluno.nome} | P1: ${aluno.P1 || "-"} | P2: ${aluno.P2 || "-"} | Nota Final: ${notaFinal.toFixed(1)}`,
      );
    });
  }
}
