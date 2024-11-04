-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_authorid_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_userid_fkey";

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_authorid_fkey" FOREIGN KEY ("authorid") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
