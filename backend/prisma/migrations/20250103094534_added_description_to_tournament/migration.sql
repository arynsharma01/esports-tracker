/*
  Warnings:

  - Added the required column `description` to the `TournamentInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TournamentInfo" ADD COLUMN     "description" TEXT NOT NULL;
