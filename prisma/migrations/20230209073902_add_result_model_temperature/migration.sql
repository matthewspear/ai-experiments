/*
  Warnings:

  - Added the required column `model` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `temperature` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Result" ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "temperature" DOUBLE PRECISION NOT NULL;
