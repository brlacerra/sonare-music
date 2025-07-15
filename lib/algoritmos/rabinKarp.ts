import { prisma } from "../prisma";
import type { Usuario } from "@prisma/client";

// Função para calcular hash de uma string
function calcularHash(str: string, base: number, mod: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * base + str.charCodeAt(i)) % mod;
  }
  return hash;
}

export async function rabinKarp(nomeBuscado: string) {
  const usuarios: Usuario[] = await prisma.usuario.findMany();
  const nomeLower = nomeBuscado.toLowerCase();
  const resultados: Usuario[] = [];

  const base = 256;
  const mod = 101;


  const hashPadrao = calcularHash(nomeLower, base, mod);
  const padraoLength = nomeLower.length;

  console.log(`Padrão buscado: "${nomeLower}" (hash: ${hashPadrao})`);


  for (const usuario of usuarios) {
    const nomeUsuario = usuario.nome.toLowerCase();
    
    if (nomeUsuario.length < padraoLength) continue;


    let hashJanela = calcularHash(nomeUsuario.substring(0, padraoLength), base, mod);
    

    if (hashJanela === hashPadrao && 
        nomeUsuario.substring(0, padraoLength) === nomeLower) {
      resultados.push(usuario);
      continue;
    }


    let fatorPotencia = 1;
    for (let i = 0; i < padraoLength - 1; i++) {
      fatorPotencia = (fatorPotencia * base) % mod;
    }


    for (let i = padraoLength; i < nomeUsuario.length; i++) {

      hashJanela = (hashJanela - nomeUsuario.charCodeAt(i - padraoLength) * fatorPotencia) % mod;
      hashJanela = (hashJanela * base + nomeUsuario.charCodeAt(i)) % mod;
      

      if (hashJanela < 0) hashJanela += mod;


      const inicio = i - padraoLength + 1;
      if (hashJanela === hashPadrao && 
          nomeUsuario.substring(inicio, inicio + padraoLength) === nomeLower) {
        resultados.push(usuario);
        break;
      }
    }
  }

  return {
    encontrados: resultados.length > 0,
    usuarios: resultados,
    total: resultados.length,
  };
}