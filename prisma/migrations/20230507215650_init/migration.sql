-- CreateEnum
CREATE TYPE "StatusCourseHistory" AS ENUM ('DONE', 'INPROGRESS', 'FAILED', 'WITHDRAWAL');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "registration" TEXT NOT NULL,
    "curriculumId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("registration")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "University" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abv" TEXT NOT NULL,

    CONSTRAINT "University_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curriculum" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "universityId" TEXT NOT NULL,
    "requiredHours" INTEGER NOT NULL,
    "optionalHours" INTEGER NOT NULL,
    "extraCurricularHours" INTEGER NOT NULL,

    CONSTRAINT "Curriculum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discipline" (
    "id" TEXT NOT NULL,
    "cod" TEXT NOT NULL,
    "optional" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "hours" INTEGER NOT NULL,
    "courseOutline" TEXT,
    "prerequisite" TEXT,
    "description" TEXT NOT NULL,
    "curriculumId" TEXT NOT NULL,

    CONSTRAINT "Discipline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseHistory" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "disciplineId" TEXT NOT NULL,
    "status" "StatusCourseHistory" NOT NULL,

    CONSTRAINT "CourseHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExtraCurricularActivitiesHistory" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "extraCurricularName" TEXT NOT NULL,
    "hours" INTEGER NOT NULL,

    CONSTRAINT "ExtraCurricularActivitiesHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Course_name_key" ON "Course"("name");

-- CreateIndex
CREATE UNIQUE INDEX "University_name_key" ON "University"("name");

-- CreateIndex
CREATE UNIQUE INDEX "University_abv_key" ON "University"("abv");

-- CreateIndex
CREATE UNIQUE INDEX "Discipline_cod_key" ON "Discipline"("cod");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "Curriculum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curriculum" ADD CONSTRAINT "Curriculum_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curriculum" ADD CONSTRAINT "Curriculum_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discipline" ADD CONSTRAINT "Discipline_prerequisite_fkey" FOREIGN KEY ("prerequisite") REFERENCES "Discipline"("cod") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discipline" ADD CONSTRAINT "Discipline_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "Curriculum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseHistory" ADD CONSTRAINT "CourseHistory_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("registration") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseHistory" ADD CONSTRAINT "CourseHistory_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Discipline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtraCurricularActivitiesHistory" ADD CONSTRAINT "ExtraCurricularActivitiesHistory_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("registration") ON DELETE RESTRICT ON UPDATE CASCADE;
