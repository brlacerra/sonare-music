import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
 await prisma.amigo.create({ data: { usuarioSpotifyID: "user001", friendSpotifyID: "user005" } });
await prisma.amigo.create({ data: { usuarioSpotifyID: "user001", friendSpotifyID: "user012" } });
await prisma.amigo.create({ data: { usuarioSpotifyID: "user002", friendSpotifyID: "user006" } });
await prisma.amigo.create({ data: { usuarioSpotifyID: "user003", friendSpotifyID: "user001" } });
await prisma.amigo.create({ data: { usuarioSpotifyID: "user004", friendSpotifyID: "user009" } });
await prisma.amigo.create({ data: { usuarioSpotifyID: "user004", friendSpotifyID: "user010" } });
await prisma.amigo.create({ data: { usuarioSpotifyID: "user005", friendSpotifyID: "user018" } });
await prisma.amigo.create({ data: { usuarioSpotifyID: "user006", friendSpotifyID: "user003" } });
await prisma.amigo.create({ data: { usuarioSpotifyID: "user007", friendSpotifyID: "user002" } });
await prisma.amigo.create({ data: { usuarioSpotifyID: "user007", friendSpotifyID: "user020" } });
await prisma.amigo.create({ data: { usuarioSpotifyID: "user008", friendSpotifyID: "user019" } });
await prisma.amigo.create({ data: { usuarioSpotifyID: "user009", friendSpotifyID: "user015" } });
await prisma.amigo.create({ data: { usuarioSpotifyID: "user010", friendSpotifyID: "user008" } });
await prisma.amigo.create({ data: { usuarioSpotifyID: "user011", friendSpotifyID: "user016" } });
await prisma.amigo.create({ data: { usuarioSpotifyID: "user012", friendSpotifyID: "user017" } });
await prisma.amigo.create({ data: { usuarioSpotifyID: "user013", friendSpotifyID: "user014" } });
await prisma.amigo.create({ data: { usuarioSpotifyID: "user014", friendSpotifyID: "user004" } });
await prisma.amigo.create({ data: { usuarioSpotifyID: "user015", friendSpotifyID: "user011" } });
await prisma.amigo.create({ data: { usuarioSpotifyID: "user016", friendSpotifyID: "user013" } });
await prisma.amigo.create({ data: { usuarioSpotifyID: "user017", friendSpotifyID: "user007" } });


  console.log("Banco populado com usuários e amigos!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
