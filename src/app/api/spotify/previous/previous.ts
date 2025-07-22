import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { previousTrack } from '@/lib/spotifyApi'

export async function POST() {
  const session = await getServerSession(authOptions)
  const accessToken = session?.accessToken as string

  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const result = await previousTrack(accessToken)
  return NextResponse.json(result)
}
