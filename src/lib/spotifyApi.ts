export async function playTrack(access_token: string, device_id: string) {
  const res = await fetch(
    `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, // <-- device_id aqui
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}), 
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Erro ao chamar a API do Spotify:", errorText);
    throw new Error(`Erro ao executar play: ${res.status} ${res.statusText}`);
  }

  return res.json().catch(() => ({}));
}



export async function pauseTrack(access_token: string){
    const res = await fetch('https://api.spotify.com/v1/me/player/pause', {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    });
    if (!res.ok) {
        throw new Error('Erro ao executar pause');
    }
    return res.json();
}

export async function nextTrack(access_token: string){
    const res = await fetch('https://api.spotify.com/v1/me/player/next', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    });
    if (!res.ok) {
        throw new Error('Erro ao executar next');
    }
    return res.json();
}

export async function previousTrack(access_token: string){
    const res = await fetch('https://api.spotify.com/v1/me/player/previous', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    });
    if (!res.ok) {
        throw new Error('Erro ao executar previous');
    }
    return res.json();
}