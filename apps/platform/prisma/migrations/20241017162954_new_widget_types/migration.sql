/*
  Warnings:

  - The primary key for the `feedbacks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `feedback_id` on the `submissions` table. All the data in the column will be lost.
  - The required column `submission_id` was added to the `feedbacks` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "WidgetType" ADD VALUE 'REPORT';
ALTER TYPE "WidgetType" ADD VALUE 'CONTACT';
ALTER TYPE "WidgetType" ADD VALUE 'SURVEY';

-- DropForeignKey
ALTER TABLE "submissions" DROP CONSTRAINT "submissions_feedback_id_fkey";

-- AlterTable
ALTER TABLE "feedbacks" DROP CONSTRAINT "feedbacks_pkey",
DROP COLUMN "created_at",
DROP COLUMN "deleted_at",
DROP COLUMN "id",
DROP COLUMN "updated_at",
ADD COLUMN     "submission_id" TEXT NOT NULL,
ADD CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("submission_id");

-- AlterTable
ALTER TABLE "files" ADD COLUMN     "reportSubmissionId" TEXT;

-- AlterTable
ALTER TABLE "submissions" DROP COLUMN "feedback_id";

-- CreateTable
CREATE TABLE "reports" (
    "submission_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("submission_id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "submission_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT,
    "message" TEXT NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("submission_id")
);

-- CreateTable
CREATE TABLE "surveys" (
    "submission_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "satisfaction" INTEGER NOT NULL,
    "options" TEXT[],

    CONSTRAINT "surveys_pkey" PRIMARY KEY ("submission_id")
);

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_reportSubmissionId_fkey" FOREIGN KEY ("reportSubmissionId") REFERENCES "reports"("submission_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_submission_id_fkey" FOREIGN KEY ("submission_id") REFERENCES "submissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_submission_id_fkey" FOREIGN KEY ("submission_id") REFERENCES "submissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_submission_id_fkey" FOREIGN KEY ("submission_id") REFERENCES "submissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surveys" ADD CONSTRAINT "surveys_submission_id_fkey" FOREIGN KEY ("submission_id") REFERENCES "submissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
