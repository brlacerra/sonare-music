import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { playTrack } from "@/lib/spotifyApi";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken as string;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { device_id } = await req.json();

  if (!device_id) {
    return NextResponse.json({ error: "device_id é obrigatório" }, { status: 400 });
  }

  const result = await playTrack(accessToken, device_id);
  return NextResponse.json(result);
}
