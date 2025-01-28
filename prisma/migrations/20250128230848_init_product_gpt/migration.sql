/*
  Warnings:

  - The primary key for the `lxia_gpt_message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `lxia_gpt_message` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "lxia_gpt_message" DROP CONSTRAINT "lxia_gpt_message_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "lxia_gpt_message_pkey" PRIMARY KEY ("id");
