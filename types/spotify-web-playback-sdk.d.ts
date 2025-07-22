// types/spotify-web-playback-sdk.d.ts

export {};

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: any; // Ou defina interface correta abaixo, se quiser
  }

  interface SpotifyPlayerInit {
    name: string;
    getOAuthToken: (cb: (token: string) => void) => void;
    volume?: number;
  }

  interface SpotifyPlayer {
    connect: () => Promise<boolean>;
    disconnect: () => void;
    addListener: (
      event: string,
      callback: (data: any) => void
    ) => boolean;
    removeListener: (event: string, callback?: () => void) => boolean;
  }

  namespace Spotify {
    class Player {
      constructor(options: SpotifyPlayerInit);
      connect(): Promise<boolean>;
      disconnect(): void;
      addListener(
        event: string,
        callback: (data: any) => void
      ): boolean;
      removeListener(event: string, callback?: () => void): boolean;
    }
  }
}
