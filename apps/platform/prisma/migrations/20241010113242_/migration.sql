/*
  Warnings:

  - A unique constraint covering the columns `[invite_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_invite_id_key" ON "users"("invite_id");
