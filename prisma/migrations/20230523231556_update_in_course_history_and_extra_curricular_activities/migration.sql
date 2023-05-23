/*
  Warnings:

  - You are about to drop the column `hours` on the `Discipline` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `ExtraCurricularActivitiesHistory` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `CourseHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hours` to the `CourseHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `CourseHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semester` to the `Discipline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `ExtraCurricularActivitiesHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `ExtraCurricularActivitiesHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentRegistration` to the `ExtraCurricularActivitiesHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExtraCurricularActivitiesHistory" DROP CONSTRAINT "ExtraCurricularActivitiesHistory_studentId_fkey";

-- AlterTable
ALTER TABLE "CourseHistory" ADD COLUMN     "endTime" TIME NOT NULL,
ADD COLUMN     "hours" INTEGER NOT NULL,
ADD COLUMN     "startTime" TIME NOT NULL;

-- AlterTable
ALTER TABLE "Discipline" DROP COLUMN "hours",
ADD COLUMN     "semester" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ExtraCurricularActivitiesHistory" DROP COLUMN "studentId",
ADD COLUMN     "endDate" DATE NOT NULL,
ADD COLUMN     "startDate" DATE NOT NULL,
ADD COLUMN     "studentRegistration" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "DaysWeek" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "DaysWeek_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseHistoryDaysWeek" (
    "daysWeekId" TEXT NOT NULL,
    "courseHistoryId" TEXT NOT NULL,

    CONSTRAINT "CourseHistoryDaysWeek_pkey" PRIMARY KEY ("daysWeekId","courseHistoryId")
);

-- CreateIndex
CREATE INDEX "CourseHistory_studentRegistration_idx" ON "CourseHistory"("studentRegistration");

-- CreateIndex
CREATE INDEX "ExtraCurricularActivitiesHistory_studentRegistration_idx" ON "ExtraCurricularActivitiesHistory"("studentRegistration");

-- AddForeignKey
ALTER TABLE "CourseHistoryDaysWeek" ADD CONSTRAINT "CourseHistoryDaysWeek_daysWeekId_fkey" FOREIGN KEY ("daysWeekId") REFERENCES "DaysWeek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseHistoryDaysWeek" ADD CONSTRAINT "CourseHistoryDaysWeek_courseHistoryId_fkey" FOREIGN KEY ("courseHistoryId") REFERENCES "CourseHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraCurricularActivitiesHistory" ADD CONSTRAINT "ExtraCurricularActivitiesHistory_studentRegistration_fkey" FOREIGN KEY ("studentRegistration") REFERENCES "Student"("registration") ON DELETE RESTRICT ON UPDATE CASCADE;
