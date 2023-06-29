/*
  Warnings:

  - Added the required column `hours` to the `Discipline` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Discipline" ADD COLUMN     "hours" INTEGER NOT NULL;
