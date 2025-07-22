export const initializeSpotifyPlayer = (accessToken: string): Promise<Spotify.Player> => {
  return new Promise((resolve, reject) => {
    const setupPlayer = () => {
      const player = new (window as any).Spotify.Player({
        name: 'Sonare Music Player',
        getOAuthToken: (cb: any) => cb(accessToken),
        volume: 0.8,
      });

      player.addListener('initialization_error', ({ message }: any) => console.error(message));
      player.addListener('authentication_error', ({ message }: any) => console.error(message));
      player.addListener('account_error', ({ message }: any) => console.error(message));
      player.addListener('playback_error', ({ message }: any) => console.error(message));

      player.addListener('ready', ({ device_id }: any) => {
        console.log('Player está pronto com ID:', device_id);
        resolve(player);
      });

      player.addListener('not_ready', ({ device_id }: any) => {
        console.log('Player não está pronto com ID:', device_id);
      });

      player.connect();
    };

    if ((window as any).Spotify) {
      setupPlayer();
    } else {
      const scriptTag = document.createElement('script');
      scriptTag.src = 'https://sdk.scdn.co/spotify-player.js';
      scriptTag.async = true;
      document.body.appendChild(scriptTag);

      (window as any).onSpotifyWebPlaybackSDKReady = () => {
        setupPlayer();
      };
    }
  });
};
