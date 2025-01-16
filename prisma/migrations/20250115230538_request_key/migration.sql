/*
  Warnings:

  - Added the required column `key` to the `lxia_account_requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lxia_account_requests" ADD COLUMN     "key" TEXT NOT NULL;
