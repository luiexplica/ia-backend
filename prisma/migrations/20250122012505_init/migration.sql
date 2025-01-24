/*
  Warnings:

  - Made the column `auth_id` on table `lxia_account_requests` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `lxia_notifications` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "lxia_account_requests" ALTER COLUMN "auth_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "lxia_notifications" ALTER COLUMN "user_id" SET NOT NULL;
