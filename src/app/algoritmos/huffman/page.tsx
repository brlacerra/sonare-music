"use client"

import { useEffect, useState } from "react"

type ResultadoHuffman = {
  nome: string
  comprimido: string
}

export default function HuffmanPage() {
  const [dados, setDados] = useState<ResultadoHuffman[]>([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function fetchDados() {
      try {
        const res = await fetch("/api/algoritmos/huffman")
        const json = await res.json()
        setDados(json)
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
      } finally {
        setCarregando(false)
      }
    }

    fetchDados()
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-6 text-white">
        Compressão Huffman dos Nomes
      </h1>

      {carregando ? (
        <p className="text-gray-300">Carregando...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm text-left text-black">
            <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">Nome</th>
                <th className="px-6 py-3">Comprimido</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((item, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="px-6 py-4 font-medium">{item.nome}</td>
                  <td className="px-6 py-4 font-mono break-all">
                    {item.comprimido}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
