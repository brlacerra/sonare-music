import { NextResponse } from "next/server"
import { huffmanCompress } from "../../../../lib/algoritmos/huffmanCompress"

export async function GET() {
  const resultado = await huffmanCompress()
  return NextResponse.json(resultado)
}
