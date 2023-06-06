/*
  Warnings:

  - You are about to drop the column `cityId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `State` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `activityType` to the `ExtraCurricularActivitiesHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atUfc` to the `ExtraCurricularActivitiesHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `institutionName` to the `ExtraCurricularActivitiesHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `situation` to the `ExtraCurricularActivitiesHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `University` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `University` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SituationType" AS ENUM ('DEFERIDO', 'INDEFERIDO', 'SEM_RESPOSTA');

-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_stateId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_cityId_fkey";

-- AlterTable
ALTER TABLE "ExtraCurricularActivitiesHistory" ADD COLUMN     "activityType" TEXT NOT NULL,
ADD COLUMN     "atUfc" BOOLEAN NOT NULL,
ADD COLUMN     "institutionCnpj" TEXT,
ADD COLUMN     "institutionCountry" TEXT,
ADD COLUMN     "institutionName" TEXT NOT NULL,
ADD COLUMN     "participationType" TEXT,
ADD COLUMN     "situation" "SituationType" NOT NULL;

-- AlterTable
ALTER TABLE "University" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cityId",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;

-- DropTable
DROP TABLE "City";

-- DropTable
DROP TABLE "State";
