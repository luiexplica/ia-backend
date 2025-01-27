/*
  Warnings:

  - Changed the type of `role` on the `lxia_gpt_message` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "lxia_gpt_message" DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Gpt_Role_Enum";
