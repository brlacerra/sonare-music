import { hashMultiplicacaoComDeslocamento } from '@/lib/algoritmos/hashDesloc';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const resultados = await hashMultiplicacaoComDeslocamento();
    return NextResponse.json(resultados);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao gerar hashes' },
      { status: 500 }
    );
  }
}