'use client';

import { useEffect } from 'react';
import { initializeSpotifyPlayer } from '@/lib/spotifyPlayer';
import { useSession } from 'next-auth/react';

export default function SpotifyPlayerWrapper() {
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.accessToken) {
            initializeSpotifyPlayer(session.accessToken).then((player) => {
            });
        }
    }, [session?.accessToken]);


    return null;
}
