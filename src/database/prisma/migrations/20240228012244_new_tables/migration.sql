/*
  Warnings:

  - You are about to alter the column `price` on the `Deal` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Deal" ADD COLUMN     "imgUrl" TEXT,
ALTER COLUMN "price" SET DATA TYPE INTEGER;

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "dealId" INTEGER NOT NULL,
    "userEmail" TEXT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_dealId_userEmail_key" ON "Like"("dealId", "userEmail");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_dealId_fkey" FOREIGN KEY ("dealId") REFERENCES "Deal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
