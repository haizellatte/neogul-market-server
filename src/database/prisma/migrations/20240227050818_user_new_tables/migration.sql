/*
  Warnings:

  - You are about to drop the column `encryptedPasswords` on the `User` table. All the data in the column will be lost.
  - Added the required column `encryptedPassword` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "encryptedPasswords",
ADD COLUMN     "encryptedPassword" TEXT NOT NULL;
