/*
  Warnings:

  - Added the required column `organization_id` to the `submissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_id` to the `submissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "submissions" ADD COLUMN     "organization_id" TEXT NOT NULL,
ADD COLUMN     "project_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "widgets" ALTER COLUMN "is_active" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
