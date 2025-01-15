/*
  Warnings:

  - The primary key for the `TournamentInfo` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "RegisteredUser" DROP CONSTRAINT "RegisteredUser_tournamentId_fkey";

-- AlterTable
ALTER TABLE "RegisteredUser" ALTER COLUMN "tournamentId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "TournamentInfo" DROP CONSTRAINT "TournamentInfo_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TournamentInfo_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TournamentInfo_id_seq";

-- AddForeignKey
ALTER TABLE "RegisteredUser" ADD CONSTRAINT "RegisteredUser_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "TournamentInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
