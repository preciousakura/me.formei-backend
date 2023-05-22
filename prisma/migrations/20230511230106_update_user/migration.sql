/*
  Warnings:

  - Made the column `stateId` on table `City` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cityId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_stateId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_cityId_fkey";

-- AlterTable
ALTER TABLE "City" ALTER COLUMN "stateId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "cityId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
