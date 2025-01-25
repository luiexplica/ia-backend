import { Module } from '@nestjs/common';
import { AccountRequestsController } from '@ac-requests/account-requests.controller';
import { AuthModule } from '@auth/auth.module';
import { AccountRequestsService } from '@ac-requests/services/account-requests.service';
import { AccountRequestsAuth_Rel_Module } from './acRequests-Auth.rel.module';

@Module({
  controllers: [AccountRequestsController],
  imports: [
    // AuthModule
    // AccountRequestsAuth_Rel_Module
  ],
  providers: [
    AccountRequestsService
  ],
  exports: [
    AccountRequestsService
  ]
})
export class AccountRequestsModule { }
