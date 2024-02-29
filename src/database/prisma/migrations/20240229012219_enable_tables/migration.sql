/*
  Warnings:

  - Made the column `imgUrl` on table `Deal` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Deal" ALTER COLUMN "imgUrl" SET NOT NULL;
