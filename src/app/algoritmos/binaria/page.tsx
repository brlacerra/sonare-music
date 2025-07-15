"use client";

import React, { useState, useEffect } from "react";

export default function BuscaBinariaPage() {
  const [input, setInput] = useState("");
  const [resultado, setResultado] = useState<any>(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (input.trim() === "") {
      setResultado(null);
      return;
    }

    const debounceTimeout = setTimeout(() => {
      buscar(input);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [input]);

  async function buscar(nome: string) {
    setCarregando(true);
    try {
      const res = await fetch("/api/algoritmos/binaria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome }),
      });
      const data = await res.json();
      setResultado(data);
    } catch (error) {
      console.error("Erro na busca:", error);
      setResultado(null);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-20 px-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Busca Binaria</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Digite o nome a buscar..."
        className="w-full p-2 rounded bg-white text-black mb-4"
      />
      {carregando && <p className="mt-4 text-white">Buscando...</p>}

      {resultado && (
        <div className="mt-6 text-white">
          {resultado.encontrados ? (
            <>
              <p>
                <strong>Total encontrados: </strong>
                {resultado.total}
              </p>
              <ul className="list-disc list-inside">
                {resultado.usuarios.map((u: any) => (
                  <li key={u.spotifyId}>{u.nome}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>Nenhum usuário encontrado.</p>
          )}
        </div>
      )}
    </div>
  );
}
