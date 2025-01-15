-- CreateTable
CREATE TABLE "TournamentInfo" (
    "id" SERIAL NOT NULL,
    "game" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "maxmembers" INTEGER NOT NULL,

    CONSTRAINT "TournamentInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegisteredUser" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "tournamentId" INTEGER NOT NULL,

    CONSTRAINT "RegisteredUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RegisteredUser" ADD CONSTRAINT "RegisteredUser_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "TournamentInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
