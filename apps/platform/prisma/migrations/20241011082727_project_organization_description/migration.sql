-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "extra" TEXT;

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "description" TEXT,
ADD COLUMN     "extra" TEXT;
