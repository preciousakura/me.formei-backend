/*
  Warnings:

  - You are about to drop the `CourseHistoryDaysWeek` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DaysWeek` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CourseHistoryDaysWeek" DROP CONSTRAINT "CourseHistoryDaysWeek_courseHistoryId_fkey";

-- DropForeignKey
ALTER TABLE "CourseHistoryDaysWeek" DROP CONSTRAINT "CourseHistoryDaysWeek_daysWeekId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "CourseHistory" ADD COLUMN     "daysWeek" TEXT[];

-- DropTable
DROP TABLE "CourseHistoryDaysWeek";

-- DropTable
DROP TABLE "DaysWeek";

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
