-- DropForeignKey
ALTER TABLE "lxia_account_requests" DROP CONSTRAINT "lxia_account_requests_auth_id_fkey";

-- AddForeignKey
ALTER TABLE "lxia_account_requests" ADD CONSTRAINT "lxia_account_requests_auth_id_fkey" FOREIGN KEY ("auth_id") REFERENCES "lxia_auth"("id") ON DELETE CASCADE ON UPDATE CASCADE;
