/*
  Warnings:

  - You are about to drop the column `capacity` on the `Classroom` table. All the data in the column will be lost.
  - You are about to drop the column `division` on the `Classroom` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tenantId,code]` on the table `College` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[collegeId,code]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `batchEndYear` to the `Classroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `batchStartYear` to the `Classroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departmentId` to the `Classroom` table without a default value. This is not possible if the table is not empty.
  - Made the column `code` on table `College` required. This step will fail if there are existing NULL values in that column.
  - Made the column `code` on table `Department` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Classroom" DROP CONSTRAINT "Classroom_branchId_fkey";

-- AlterTable
ALTER TABLE "Classroom" DROP COLUMN "capacity",
DROP COLUMN "division",
ADD COLUMN     "batchEndYear" INTEGER NOT NULL,
ADD COLUMN     "batchStartYear" INTEGER NOT NULL,
ADD COLUMN     "departmentId" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "branchId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "College" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "code" SET NOT NULL;

-- AlterTable
ALTER TABLE "Department" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "code" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "College_tenantId_code_key" ON "College"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "Department_collegeId_code_key" ON "Department"("collegeId", "code");

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
