import { NextRequest, NextResponse } from "next/server";
import { rabinKarp } from "../../../../lib/algoritmos/rabinKarp";

export async function POST(req: NextRequest) {
  const { nome } = await req.json();

  if (!nome || nome.trim() === "") {
    return NextResponse.json({ error: "Nome inválido" }, { status: 400 });
  }

  const resultado = await rabinKarp(nome);
  return NextResponse.json(resultado);
}
