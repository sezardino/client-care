/*
  Warnings:

  - You are about to drop the column `slug` on the `widgets` table. All the data in the column will be lost.
  - Added the required column `is_test` to the `widgets` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "widgets_slug_key";

-- AlterTable
ALTER TABLE "widgets" DROP COLUMN "slug",
ADD COLUMN     "is_test" BOOLEAN NOT NULL;
