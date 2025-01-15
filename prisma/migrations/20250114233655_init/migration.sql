-- CreateEnum
CREATE TYPE "AuthStatus_Enum" AS ENUM ('VERIFIED', 'BLOCKED', 'DELETED', 'SUSPENDED', 'PENDING', 'ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "User_Role_Enum" AS ENUM ('ADMIN_ROLE', 'SUPPORT_ROLE', 'CLIENT_ROLE');

-- CreateEnum
CREATE TYPE "Gender_Enum" AS ENUM ('MALE', 'FEMALE', 'NONE');

-- CreateTable
CREATE TABLE "lxia_auth" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "last_session" TIMESTAMP(3),
    "status" "AuthStatus_Enum" NOT NULL DEFAULT 'PENDING',
    "role" "User_Role_Enum" NOT NULL DEFAULT 'CLIENT_ROLE',
    "user_id" TEXT NOT NULL,

    CONSTRAINT "lxia_auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lxia_user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "gender" "Gender_Enum" DEFAULT 'NONE',
    "phone" TEXT,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "lxia_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "lxia_auth_email_key" ON "lxia_auth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "lxia_auth_username_key" ON "lxia_auth"("username");

-- CreateIndex
CREATE UNIQUE INDEX "lxia_auth_user_id_key" ON "lxia_auth"("user_id");

-- AddForeignKey
ALTER TABLE "lxia_auth" ADD CONSTRAINT "lxia_auth_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "lxia_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
