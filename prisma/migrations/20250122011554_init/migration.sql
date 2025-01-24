-- CreateEnum
CREATE TYPE "AuthStatus_Enum" AS ENUM ('VERIFIED', 'BLOCKED', 'DELETED', 'SUSPENDED', 'PENDING', 'ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "User_Role_Enum" AS ENUM ('ADMIN_ROLE', 'SUPPORT_ROLE', 'CLIENT_ROLE');

-- CreateEnum
CREATE TYPE "RequestType_Enum" AS ENUM ('CONFIRM_ACCOUNT', 'RESET_PASSWORD', 'CHANGE_EMAIL');

-- CreateEnum
CREATE TYPE "RequestStatus_Enum" AS ENUM ('PENDING', 'USED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "Gender_Enum" AS ENUM ('MALE', 'FEMALE', 'NONE');

-- CreateEnum
CREATE TYPE "NotificationState_Enum" AS ENUM ('READ', 'UNREAD');

-- CreateEnum
CREATE TYPE "NotificationTemplate_Enum" AS ENUM ('CREATE_ACCOUNT', 'RESET_PASSWORD', 'CHANGE_EMAIL', 'INFO');

-- CreateTable
CREATE TABLE "lxia_auth" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "last_session" TIMESTAMPTZ(3),
    "status" "AuthStatus_Enum" NOT NULL DEFAULT 'PENDING',
    "role" "User_Role_Enum" NOT NULL DEFAULT 'CLIENT_ROLE',
    "user_id" TEXT NOT NULL,

    CONSTRAINT "lxia_auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lxia_account_requests" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "type" "RequestType_Enum" NOT NULL,
    "status" "RequestStatus_Enum" NOT NULL DEFAULT 'PENDING',
    "detail" TEXT,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "used_at" TIMESTAMPTZ(3),
    "auth_id" TEXT,

    CONSTRAINT "lxia_account_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lxia_user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "gender" "Gender_Enum" DEFAULT 'NONE',
    "phone" TEXT,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "lxia_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lxia_notifications" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "read_at" TIMESTAMPTZ(3),
    "state" "NotificationState_Enum" NOT NULL DEFAULT 'UNREAD',
    "template" "NotificationTemplate_Enum" NOT NULL DEFAULT 'INFO',
    "user_id" TEXT,

    CONSTRAINT "lxia_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "lxia_auth_email_key" ON "lxia_auth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "lxia_auth_username_key" ON "lxia_auth"("username");

-- CreateIndex
CREATE UNIQUE INDEX "lxia_auth_user_id_key" ON "lxia_auth"("user_id");

-- AddForeignKey
ALTER TABLE "lxia_auth" ADD CONSTRAINT "lxia_auth_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "lxia_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lxia_account_requests" ADD CONSTRAINT "lxia_account_requests_auth_id_fkey" FOREIGN KEY ("auth_id") REFERENCES "lxia_auth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lxia_notifications" ADD CONSTRAINT "lxia_notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "lxia_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
