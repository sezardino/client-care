/*
  Warnings:

  - Made the column `extra` on table `organizations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `projects` required. This step will fail if there are existing NULL values in that column.
  - Made the column `extra` on table `projects` required. This step will fail if there are existing NULL values in that column.
  - Made the column `first_name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `last_name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `position` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "organizations" ALTER COLUMN "extra" SET NOT NULL,
ALTER COLUMN "extra" SET DEFAULT '';

-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "extra" SET NOT NULL,
ALTER COLUMN "extra" SET DEFAULT '';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "first_name" SET NOT NULL,
ALTER COLUMN "first_name" SET DEFAULT '',
ALTER COLUMN "last_name" SET NOT NULL,
ALTER COLUMN "last_name" SET DEFAULT '',
ALTER COLUMN "position" SET NOT NULL,
ALTER COLUMN "position" SET DEFAULT '';
