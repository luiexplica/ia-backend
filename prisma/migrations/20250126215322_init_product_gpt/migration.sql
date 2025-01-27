/*
  Warnings:

  - Added the required column `model` to the `lxia_ia_conversation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lxia_ia_conversation" ADD COLUMN     "model" TEXT NOT NULL;
