import { Module } from '@nestjs/common';
import { ACCOUNTREQUESTS_SERVICE_TOKEN, AccountRequestsService } from './account-requests.service';
import { AccountRequestsController } from './account-requests.controller';

@Module({
  controllers: [AccountRequestsController],
  providers: [
    {
      provide: ACCOUNTREQUESTS_SERVICE_TOKEN,
      useClass: AccountRequestsService
    }
  ],
  exports: [
    ACCOUNTREQUESTS_SERVICE_TOKEN
  ]
})
export class AccountRequestsModule { }
