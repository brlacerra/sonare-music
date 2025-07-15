import { NextRequest, NextResponse } from "next/server";
import { buscaSequencial } from "../../../../../lib/algoritmos/buscaSequencial";

export async function POST(req: NextRequest) {
  const { nome } = await req.json();

  if (!nome || nome.trim() === "") {
    return NextResponse.json({ error: "Nome inválido" }, { status: 400 });
  }

  const resultado = await buscaSequencial(nome);
  return NextResponse.json(resultado);
}
