-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_task_fkey";

-- AlterTable
ALTER TABLE "Result" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
