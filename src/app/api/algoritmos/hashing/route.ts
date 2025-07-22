import { NextResponse } from "next/server";
import { gerarHashes } from "../../../../lib/algoritmos/hashing";

export async function GET() {
  try {
    const hashes = await gerarHashes();
    return NextResponse.json(hashes);
  } catch (error) {
    console.error("Erro ao gerar hashes:", error);
    return NextResponse.json({ error: "Erro ao gerar hashes" }, { status: 500 });
  }
}
