-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "handler" TEXT,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'assaulter';
