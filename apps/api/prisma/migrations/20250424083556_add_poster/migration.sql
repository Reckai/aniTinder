/*
  Warnings:

  - Added the required column `poster` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "poster" TEXT NOT NULL;
