/*
  Warnings:

  - You are about to drop the column `nomeAmigo` on the `amigo` table. All the data in the column will be lost.
  - You are about to drop the column `spotifyId` on the `amigo` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `amigo` table. All the data in the column will be lost.
  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `usuario` table. All the data in the column will be lost.
  - Added the required column `friendSpotifyID` to the `Amigo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioSpotifyID` to the `Amigo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `amigo` DROP FOREIGN KEY `Amigo_usuarioId_fkey`;

-- DropIndex
DROP INDEX `Amigo_usuarioId_fkey` ON `amigo`;

-- DropIndex
DROP INDEX `Usuario_spotifyId_key` ON `usuario`;

-- AlterTable
ALTER TABLE `amigo` DROP COLUMN `nomeAmigo`,
    DROP COLUMN `spotifyId`,
    DROP COLUMN `usuarioId`,
    ADD COLUMN `friendSpotifyID` VARCHAR(191) NOT NULL,
    ADD COLUMN `usuarioSpotifyID` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `usuario` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`spotifyId`);

-- AddForeignKey
ALTER TABLE `Amigo` ADD CONSTRAINT `Amigo_usuarioSpotifyID_fkey` FOREIGN KEY (`usuarioSpotifyID`) REFERENCES `Usuario`(`spotifyId`) ON DELETE RESTRICT ON UPDATE CASCADE;
