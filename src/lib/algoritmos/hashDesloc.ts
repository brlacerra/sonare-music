import { prisma } from "../prisma";

const TAMANHO_TABELA = 61;
const A = 0.6180339887;

export async function hashMultiplicacaoComDeslocamento() {
  const usuarios = await prisma.usuario.findMany();
  const tabela: (string | null)[] = new Array(TAMANHO_TABELA).fill(null);
  const resultados: ResultadoHash[] = [];

  function stringParaNumero(str: string): number {
    let soma = 0;
    for (let i = 0; i < str.length; i++) {
      soma += str.charCodeAt(i) * (i + 1); 
    }
    return soma;
  }

  function calcularIndice(chave: string): number {
    const numero = stringParaNumero(chave);
    const produto = numero * A;
    const parteFracionaria = produto - Math.floor(produto);
    return Math.floor(TAMANHO_TABELA * parteFracionaria);
  }

  for (const usuario of usuarios) {
    const chave = usuario.nome;
    const indiceOriginal = calcularIndice(chave);
    let indiceFinal = indiceOriginal;
    let colisao = false;

    while (tabela[indiceFinal] !== null && tabela[indiceFinal] !== chave) {
      indiceFinal = (indiceFinal + 1) % TAMANHO_TABELA;
      colisao = true;
    }

    tabela[indiceFinal] = chave;

    resultados.push({
      chave,
      indiceOriginal,
      indiceFinal,
      colisao
    });
  }

  return resultados;
}

export type ResultadoHash = {
  chave: string;
  indiceOriginal: number;
  indiceFinal: number;
  colisao: boolean;
};