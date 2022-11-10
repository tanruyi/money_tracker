/*
  Warnings:

  - You are about to drop the column `typeId` on the `Categories` table. All the data in the column will be lost.
  - Added the required column `recordId` to the `Categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_typeId_fkey";

-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "typeId",
ADD COLUMN     "recordId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "RecordTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
