/*
  Warnings:

  - Added the required column `gpt_id` to the `lxia_gpt_message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lxia_gpt_message" ADD COLUMN     "gpt_id" TEXT NOT NULL;
