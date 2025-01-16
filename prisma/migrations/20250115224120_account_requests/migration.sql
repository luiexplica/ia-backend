-- CreateEnum
CREATE TYPE "RequestType_Enum" AS ENUM ('CONFIRM_ACCOUNT', 'RESET_PASSWORD', 'CHANGE_EMAIL');

-- CreateEnum
CREATE TYPE "RequestStatus_Enum" AS ENUM ('PENDING', 'USED', 'EXPIRED');

-- CreateTable
CREATE TABLE "lxia_account_requests" (
    "id" TEXT NOT NULL,
    "type" "RequestType_Enum" NOT NULL,
    "status" "RequestStatus_Enum" NOT NULL DEFAULT 'PENDING',
    "detail" TEXT,
    "created_at" TIMESTAMP(3),
    "used_at" TIMESTAMP(3),
    "auth_id" TEXT,

    CONSTRAINT "lxia_account_requests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lxia_account_requests" ADD CONSTRAINT "lxia_account_requests_auth_id_fkey" FOREIGN KEY ("auth_id") REFERENCES "lxia_auth"("id") ON DELETE SET NULL ON UPDATE CASCADE;
