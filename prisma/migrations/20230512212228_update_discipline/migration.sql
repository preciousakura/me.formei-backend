/*
  Warnings:

  - You are about to drop the column `prerequisite` on the `Discipline` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Discipline" DROP CONSTRAINT "Discipline_prerequisite_fkey";

-- AlterTable
ALTER TABLE "Discipline" DROP COLUMN "prerequisite";

-- CreateTable
CREATE TABLE "_prequisitesToDiscipline" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_prequisitesToDiscipline_AB_unique" ON "_prequisitesToDiscipline"("A", "B");

-- CreateIndex
CREATE INDEX "_prequisitesToDiscipline_B_index" ON "_prequisitesToDiscipline"("B");

-- AddForeignKey
ALTER TABLE "_prequisitesToDiscipline" ADD CONSTRAINT "_prequisitesToDiscipline_A_fkey" FOREIGN KEY ("A") REFERENCES "Discipline"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_prequisitesToDiscipline" ADD CONSTRAINT "_prequisitesToDiscipline_B_fkey" FOREIGN KEY ("B") REFERENCES "Discipline"("id") ON DELETE CASCADE ON UPDATE CASCADE;
