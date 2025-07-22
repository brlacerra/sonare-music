// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import type { NextAuthOptions } from "next-auth"
import type { JWT } from "next-auth/jwt"

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token.refreshToken as string,
      }),
    })

    const refreshedTokens = await response.json()

    if (!response.ok) throw refreshedTokens

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + Number(refreshedTokens.expires_in) * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    console.error("Erro ao atualizar token do Spotify", error)
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

const scopes = [
  "user-read-email",
  "user-read-private",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "streaming",
  "playlist-read-private",
].join(" ")

const authorizationUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
  scope: scopes,
})}`

// 🔓 Exporta-se as configurações
export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: authorizationUrl,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.accessTokenExpires = Date.now() + Number(account.expires_in ?? 3600) * 1000
        return token
      }

      if (Date.now() < (token.accessTokenExpires ?? 0)) {
        return token
      }

      return await refreshAccessToken(token)
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.error = token.error
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
