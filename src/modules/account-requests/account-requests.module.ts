import { Module } from '@nestjs/common';
import { AccountRequestsController } from '@ac-requests/account-requests.controller';
import { AccountRequestsService } from '@ac-requests/account-requests.service';

@Module({
  controllers: [AccountRequestsController],
  imports: [
    // AuthModule
  ],
  providers: [
    AccountRequestsService,


  ],
  exports: [
    AccountRequestsService
  ]
})
export class AccountRequestsModule { }
