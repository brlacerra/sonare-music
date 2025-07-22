import { prisma } from "../prisma";
import type { Usuario } from "@prisma/client";

export async function buscaBinaria(nomeBuscado: string) {

  const usuarios: Usuario[] = await prisma.$queryRaw`
    SELECT * FROM Usuario 
    ORDER BY nome ASC
  `;

  console.log('Lista de usuários ordenada:', usuarios.map(u => u.nome));
  console.log('Nome buscado:', nomeBuscado);

  const nomeLower = nomeBuscado.toLowerCase();
  let inicio = 0;
  let fim = usuarios.length - 1;
  let posicaoEncontrada = -1;

  while (inicio <= fim) {
    const meio = Math.floor((inicio + fim) / 2);
    const nomeAtual = usuarios[meio].nome.toLowerCase();
    console.log(`Comparando: ${nomeAtual} com ${nomeLower} (posição ${meio})`);

    if (nomeAtual === nomeLower) {
      posicaoEncontrada = meio;
      console.log('Encontrado exato na posição:', meio);
      break;
    } else if (nomeAtual < nomeLower) {
      inicio = meio + 1;
    } else {
      fim = meio - 1;
    }
  }

  if (posicaoEncontrada === -1) {
    console.log('Nenhum match exato, buscando por prefixo...');
    inicio = 0;
    fim = usuarios.length - 1;
    
    while (inicio <= fim) {
      const meio = Math.floor((inicio + fim) / 2);
      const nomeAtual = usuarios[meio].nome.toLowerCase();
      
      if (nomeAtual.startsWith(nomeLower)) {
        posicaoEncontrada = meio;
        console.log('Encontrado prefixo na posição:', meio);
        break;
      } else if (nomeAtual < nomeLower) {
        inicio = meio + 1;
      } else {
        fim = meio - 1;
      }
    }
  }


  const resultados: Usuario[] = [];
  
  if (posicaoEncontrada !== -1) {
    let i = posicaoEncontrada;
    while (i >= 0 && usuarios[i].nome.toLowerCase().startsWith(nomeLower)) {
      resultados.unshift(usuarios[i]);
      i--;
    }

    i = posicaoEncontrada + 1;
    while (i < usuarios.length && usuarios[i].nome.toLowerCase().startsWith(nomeLower)) {
      resultados.push(usuarios[i]);
      i++;
    }
  }

  console.log('Resultados encontrados:', resultados.map(u => u.nome));
  return {
    encontrados: resultados.length > 0,
    usuarios: resultados,
    total: resultados.length,
  };
}