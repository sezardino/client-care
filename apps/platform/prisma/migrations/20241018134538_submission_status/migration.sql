-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('NEW', 'DECLINED', 'PROCESSED');

-- AlterTable
ALTER TABLE "submissions" ADD COLUMN     "declined_at" TIMESTAMP(3),
ADD COLUMN     "status" "SubmissionStatus" NOT NULL DEFAULT 'NEW';
