import { prisma } from "../prisma";
import type { Usuario } from "@prisma/client";

export async function buscaSequencial(nomeBuscado: string) {
  const usuarios: Usuario[] = await prisma.usuario.findMany();

  const prefixoLower = nomeBuscado.toLowerCase();
  const resultados: Usuario[] = [];

  for (let i = 0; i < usuarios.length; i++) {
    const user = usuarios[i].nome.slice(0, nomeBuscado.length).toLowerCase();
    if (user === prefixoLower) {
      resultados.push(usuarios[i]);
    }
  }

  return {
    encontrados: resultados.length > 0,
    usuarios: resultados,
    total: resultados.length,
  };
}
