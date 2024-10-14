/*
  Warnings:

  - You are about to drop the column `extra` on the `projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "extra",
ADD COLUMN     "url" TEXT NOT NULL DEFAULT '';
