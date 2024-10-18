/*
  Warnings:

  - You are about to drop the column `email` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `submissions` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `surveys` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `surveys` table. All the data in the column will be lost.
  - Added the required column `email` to the `submissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_submission_id_fkey";

-- DropForeignKey
ALTER TABLE "feedbacks" DROP CONSTRAINT "feedbacks_submission_id_fkey";

-- DropForeignKey
ALTER TABLE "reports" DROP CONSTRAINT "reports_submission_id_fkey";

-- DropForeignKey
ALTER TABLE "surveys" DROP CONSTRAINT "surveys_submission_id_fkey";

-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "email",
DROP COLUMN "full_name",
DROP COLUMN "phone";

-- AlterTable
ALTER TABLE "feedbacks" DROP COLUMN "email",
DROP COLUMN "full_name";

-- AlterTable
ALTER TABLE "reports" DROP COLUMN "email",
DROP COLUMN "full_name";

-- AlterTable
ALTER TABLE "submissions" DROP COLUMN "deleted_at",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "full_name" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "phone" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "surveys" DROP COLUMN "email",
DROP COLUMN "full_name";

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_submission_id_fkey" FOREIGN KEY ("submission_id") REFERENCES "submissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_submission_id_fkey" FOREIGN KEY ("submission_id") REFERENCES "submissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_submission_id_fkey" FOREIGN KEY ("submission_id") REFERENCES "submissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surveys" ADD CONSTRAINT "surveys_submission_id_fkey" FOREIGN KEY ("submission_id") REFERENCES "submissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
