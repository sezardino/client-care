/*
  Warnings:

  - You are about to drop the column `domains` on the `projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "domains";

-- AlterTable
ALTER TABLE "widgets" ADD COLUMN     "domains" TEXT[];
