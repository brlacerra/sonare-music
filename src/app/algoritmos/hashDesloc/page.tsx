'use client'

import { useEffect, useState } from 'react'

export default function HashPage() {
  const [resultados, setResultados] = useState<ResultadoHash[]>([])

  useEffect(() => {
    fetch('/api/algoritmos/hashDesloc')
      .then((res) => res.json())
      .then(setResultados)
  }, [])

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">🔐 Hashing com Enlaçamento Deslocado</h1>

      <p className="mb-6 text-gray-600">
        Os nomes dos usuários foram convertidos para números e inseridos em uma tabela hash de tamanho fixo
        utilizando <strong>função hash por multiplicação</strong> com enlaçamento linear para resolver colisões.
      </p>

      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-gray-100 text-black uppercase">
            <tr>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Índice Original</th>
              <th className="px-4 py-3">Índice Final</th>
              <th className="px-4 py-3">Colisão?</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((res, i) => (
              <tr key={i} className="border-t text-black hover:bg-gray-50">
                <td className="px-4 py-2">{res.chave}</td>
                <td className="px-4 py-2">{res.indiceOriginal}</td>
                <td className="px-4 py-2">{res.indiceFinal}</td>
                <td className="px-4 py-2">
                  {res.indiceOriginal === res.indiceFinal ? 'Não' : 'Sim'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <details className="mt-8 bg-gray-50 border border-gray-300 rounded p-4">
        <summary className="cursor-pointer font-semibold text-gray-800">
          📘 Ver detalhes técnicos
        </summary>
        <ul className="list-disc pl-6 mt-3 text-gray-700 text-sm space-y-2">
          <li>Tamanho da tabela hash: <code>31</code></li>
          <li>Constante de multiplicação: <code>A = 0.6180339887</code> (aproximação de φ - 1)</li>
          <li>Conversão de strings para número usa a fórmula: <code>∑ charCode * (posição + 1)</code></li>
          <li>Colisões são resolvidas com deslocamento linear até achar posição vazia</li>
        </ul>
      </details>
    </main>
  )
}

// Tipo local para o cliente
type ResultadoHash = {
  chave: string;
  indiceOriginal: number;
  indiceFinal: number;
  colisao: boolean;
};
