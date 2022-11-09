-- DropForeignKey
ALTER TABLE "Budget" DROP CONSTRAINT "Budget_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Expenses" DROP CONSTRAINT "Expenses_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_categoryId_fkey";

-- AlterTable
ALTER TABLE "Budget" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Expenses" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Income" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
