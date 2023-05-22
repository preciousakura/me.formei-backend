/*
  Warnings:

  - Changed the type of `enrollmentYear` on the `Student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "enrollmentYear",
ADD COLUMN     "enrollmentYear" INTEGER NOT NULL;
