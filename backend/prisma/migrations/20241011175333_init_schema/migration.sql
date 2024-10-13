-- CreateTable
CREATE TABLE "Teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT,
    "ign" TEXT NOT NULL,
    "current" BOOLEAN NOT NULL DEFAULT false,
    "authorid" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teams_name_key" ON "Teams"("name");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_authorid_fkey" FOREIGN KEY ("authorid") REFERENCES "Teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
