-- CreateEnum
CREATE TYPE "IA_Type_Enum" AS ENUM ('GPT');

-- CreateEnum
CREATE TYPE "Gpt_Role_Enum" AS ENUM ('SYSTEM', 'USER', 'ASSISTANT');

-- CreateTable
CREATE TABLE "lxia_ia_conversation" (
    "id" TEXT NOT NULL,
    "type" "IA_Type_Enum" NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "lxia_ia_conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lxia_gpt_message" (
    "id" TEXT NOT NULL,
    "role" "Gpt_Role_Enum" NOT NULL,
    "content" TEXT NOT NULL,
    "prompt_tokens" INTEGER NOT NULL,
    "completion_tokens" INTEGER NOT NULL,
    "total_tokens" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "finish_reason" TEXT NOT NULL,
    "ia_conversation_id" TEXT NOT NULL,

    CONSTRAINT "lxia_gpt_message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "lxia_ia_conversation_user_id_key" ON "lxia_ia_conversation"("user_id");

-- AddForeignKey
ALTER TABLE "lxia_ia_conversation" ADD CONSTRAINT "lxia_ia_conversation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "lxia_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lxia_gpt_message" ADD CONSTRAINT "lxia_gpt_message_ia_conversation_id_fkey" FOREIGN KEY ("ia_conversation_id") REFERENCES "lxia_ia_conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
