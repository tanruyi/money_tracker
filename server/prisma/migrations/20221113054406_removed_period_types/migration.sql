/*
  Warnings:

  - You are about to drop the column `periodId` on the `Budget` table. All the data in the column will be lost.
  - You are about to drop the `PeriodTypes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `endMonth` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startMonth` to the `Budget` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Budget" DROP CONSTRAINT "Budget_periodId_fkey";

-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "periodId",
ADD COLUMN     "endMonth" DATE NOT NULL,
ADD COLUMN     "startMonth" DATE NOT NULL;

-- DropTable
DROP TABLE "PeriodTypes";
