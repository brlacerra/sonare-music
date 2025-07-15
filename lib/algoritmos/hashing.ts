import { prisma } from "../prisma";


function djb2(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash = hash & 0xFFFFFFFF; 
  }
  return Math.abs(hash); 
}


export async function gerarHashes() {
  const usuarios = await prisma.usuario.findMany();

  const resultados = usuarios.map(usuario => ({
    nome: usuario.nome,
    hash: djb2(usuario.nome),
  }));

  return resultados;
}
