'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function PlayerPage() {
  const [device_id, setDeviceId] = useState<string | null>(null);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  console.log('Device ID:', device_id);
  const callSpotifyAction = async (endpoint: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/spotify/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',},
        body: JSON.stringify({ device_id }),
      });

      if (!res.ok) {
        const contentType = res.headers.get('content-type');
        let errMsg = '';

        if (contentType?.includes('application/json')) {
          const errJson = await res.json();
          errMsg = errJson.error || JSON.stringify(errJson);
        } else {
          errMsg = await res.text();
        }

        console.error(`Erro ao chamar /${endpoint}:`, errMsg || '(sem mensagem)');
      }
    } catch (error) {
      console.error(`Erro interno ao chamar /${endpoint}:`, error);
    } finally {
      setLoading(false);
    }
  };


  if (!session) {
    return <p className="p-4 text-red-600">Você precisa estar logado para acessar o player.</p>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white gap-4">
      <h1 className="text-3xl font-bold">🎵 Player Sonare</h1>

      <div className="flex gap-4">
        <button
          onClick={() => callSpotifyAction('previous')}
          className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700"
          disabled={loading}
        >
          ⏮️ Anterior
        </button>

        <button
          onClick={() => callSpotifyAction('play')}
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-500"
          disabled={loading}
        >
          ▶️ Play
        </button>

        <button
          onClick={() => callSpotifyAction('pause')}
          className="bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-500"
          disabled={loading}
        >
          ⏸️ Pausar
        </button>

        <button
          onClick={() => callSpotifyAction('next')}
          className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700"
          disabled={loading}
        >
          ⏭️ Próxima
        </button>
      </div>
    </main>
  );
}
