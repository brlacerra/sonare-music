import { NextRequest, NextResponse } from "next/server";
import { buscaBinaria } from "@/lib/algoritmos/buscaBinaria";

export async function POST(req: NextRequest) {
  const { nome } = await req.json();

  if (!nome || nome.trim() === "") {
    return NextResponse.json({ error: "Nome inválido" }, { status: 400 });
  }

  const resultado = await buscaBinaria(nome);
  return NextResponse.json(resultado);
}
