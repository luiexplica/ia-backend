/*
  Warnings:

  - A unique constraint covering the columns `[gpt_id]` on the table `lxia_gpt_message` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "lxia_gpt_message_gpt_id_key" ON "lxia_gpt_message"("gpt_id");
