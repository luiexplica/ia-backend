import { Module } from "@nestjs/common";
import { AccountRequestsAuth_Rel_Service } from "../services/acRequests-Auth.rel.service";
import { AuthModule } from "../../auth/auth.module";
import { AccountRequestsModule } from "./account-requests.module";


@Module({
  controllers: [],
  imports: [
    // AuthModule,
    AccountRequestsModule
  ],
  providers: [
    AccountRequestsAuth_Rel_Service
  ],
  exports: [
    AccountRequestsAuth_Rel_Service
  ]
})
export class AccountRequestsAuth_Rel_Module { }

