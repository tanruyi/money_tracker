/*
  Warnings:

  - Added the required column `recordId` to the `Budget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "recordId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_recordId_fkey" FOREIGN KEY ("recordId") REFERENCES "RecordTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
