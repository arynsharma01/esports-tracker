-- CreateTable
CREATE TABLE "Packages" (
    "id" TEXT NOT NULL,
    "coins" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "Packages_pkey" PRIMARY KEY ("id")
);
